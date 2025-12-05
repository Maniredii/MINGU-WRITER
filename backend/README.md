# Paraphrase API Backend

FastAPI-based backend service for AI-powered text paraphrasing using Hugging Face transformers.

## Features

- RESTful API with automatic documentation
- T5-based paraphrasing model
- Configurable paraphrase strength (0-100)
- CORS enabled for local development
- Comprehensive error handling and logging

## Installation

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note:** First run will download the AI model (~500MB). This may take several minutes.

## Running the Server

### Development Mode

```bash
uvicorn paraphrase_api:app --host 127.0.0.1 --port 8000 --reload
```

### Production Mode

```bash
python paraphrase_api.py
```

The server will start at `http://127.0.0.1:8000`

## API Endpoints

### POST /paraphrase

Paraphrase text with configurable strength.

**Request:**
```json
{
  "text": "This is a sample sentence to paraphrase.",
  "strength": 50
}
```

**Response:**
```json
{
  "paraphrase": "This is an example sentence for paraphrasing.",
  "original_text": "This is a sample sentence to paraphrase.",
  "strength": 50
}
```

**Strength Parameter:**
- `0-30`: Conservative (minimal changes)
- `31-70`: Moderate (balanced)
- `71-100`: Aggressive (maximum diversity)

### GET /health

Check service health and model status.

### GET /docs

Interactive API documentation (Swagger UI)

## Testing

Test the API using curl:

```bash
curl -X POST http://localhost:8000/paraphrase \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"This is a test sentence.\",\"strength\":50}"
```

Or visit `http://localhost:8000/docs` for interactive testing.

## Configuration

To use a different paraphrase model, edit `MODEL_NAME` in `paraphrase_api.py`:

```python
MODEL_NAME = "ramsrigouthamg/t5_paraphraser"  # Change to your preferred model
```

## Troubleshooting

**Model loading fails:**
- Ensure you have sufficient disk space (~2GB)
- Check internet connection for first-time download
- Try a smaller model if memory is limited

**Slow performance:**
- Consider using GPU acceleration (install `torch` with CUDA support)
- Reduce `num_beams` parameter for faster generation
- Use a smaller/quantized model

**Port already in use:**
```bash
# Change port in command
uvicorn paraphrase_api:app --host 127.0.0.1 --port 8001
```
