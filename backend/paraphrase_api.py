# paraphrase_api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import logging
import sys

# Hugging Face transformers
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Paraphrase API",
    description="AI-powered text paraphrasing service using transformer models",
    version="1.0.0"
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Choose a paraphrase-capable model
# Options: "ramsrigouthamg/t5_paraphraser", "Vamsi/T5_Paraphrase_Paws"
MODEL_NAME = "ramsrigouthamg/t5_paraphraser"

# Global variables for model and tokenizer
tokenizer = None
model = None


class ParaphraseRequest(BaseModel):
    text: str = Field(..., description="Text to paraphrase", min_length=1)
    strength: Optional[int] = Field(
        default=50,
        description="Paraphrase strength (0-100). Higher values produce more diverse results.",
        ge=0,
        le=100
    )


class ParaphraseResponse(BaseModel):
    paraphrase: str
    original_text: str
    strength: int


@app.on_event("startup")
async def load_model():
    """Load the paraphrase model on startup"""
    global tokenizer, model
    try:
        logger.info(f"Loading model '{MODEL_NAME}'... (this may take a few minutes on first run)")
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
        logger.info("Model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "model": MODEL_NAME,
        "endpoints": {
            "paraphrase": "/paraphrase (POST)",
            "health": "/health (GET)",
            "docs": "/docs (GET)"
        }
    }


@app.get("/health")
async def health_check():
    """Check if the service is healthy and model is loaded"""
    if model is None or tokenizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "healthy", "model_loaded": True}


@app.post("/paraphrase", response_model=ParaphraseResponse)
async def paraphrase(req: ParaphraseRequest):
    """
    Paraphrase the provided text using AI.
    
    - **text**: The text to paraphrase (required)
    - **strength**: Paraphrase strength from 0-100 (optional, default: 50)
      - 0-30: Conservative paraphrasing (minimal changes)
      - 31-70: Moderate paraphrasing (balanced)
      - 71-100: Aggressive paraphrasing (maximum diversity)
    """
    if model is None or tokenizer is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please wait for the service to initialize."
        )
    
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    try:
        logger.info(f"Paraphrasing text (length: {len(text)}, strength: {req.strength})")
        
        # Prepare model input
        # Many T5 paraphrase models accept instruction-style input
        input_text = f"paraphrase: {text}"
        
        inputs = tokenizer.encode(
            input_text,
            return_tensors="pt",
            max_length=512,
            truncation=True
        )
        
        # Map strength to decoding parameters
        strength = max(0, min(100, req.strength))
        
        # Higher strength -> more diverse generation
        temperature = 0.7 + (strength / 100.0) * 0.8  # Range: 0.7 to 1.5
        num_beams = 4 if strength < 40 else 2  # Conservative vs aggressive
        do_sample = strength > 30  # Enable sampling for higher diversity
        
        logger.info(f"Generation params - temp: {temperature:.2f}, beams: {num_beams}, sample: {do_sample}")
        
        # Generate paraphrase
        outputs = model.generate(
            inputs,
            max_length=512,
            num_beams=num_beams,
            early_stopping=True,
            temperature=temperature,
            num_return_sequences=1,
            do_sample=do_sample,
        )
        
        paraphrase_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        logger.info(f"Paraphrase generated successfully (length: {len(paraphrase_text)})")
        
        return ParaphraseResponse(
            paraphrase=paraphrase_text,
            original_text=text,
            strength=strength
        )
        
    except Exception as e:
        logger.error(f"Error during paraphrasing: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to paraphrase text: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
