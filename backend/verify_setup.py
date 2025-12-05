"""
Quick verification script to test if the backend can start.
"""
import sys

try:
    print("Checking imports...")
    import fastapi
    print(f"✓ FastAPI {fastapi.__version__}")
    
    import transformers
    print(f"✓ Transformers {transformers.__version__}")
    
    import torch
    print(f"✓ PyTorch {torch.__version__}")
    
    import uvicorn
    print(f"✓ Uvicorn")
    
    print("\n✅ All dependencies are installed correctly!")
    print("\nYou can now start the backend with:")
    print("  .\\start-backend.bat")
    print("\nOr manually:")
    print("  .\\venv\\Scripts\\activate")
    print("  python paraphrase_api.py")
    
except ImportError as e:
    print(f"\n❌ Error: {e}")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)
