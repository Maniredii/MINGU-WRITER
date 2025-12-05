#!/bin/bash

echo "========================================"
echo "Starting Paraphrase API Backend"
echo "========================================"
echo ""

cd "$(dirname "$0")/backend"

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo ""
echo "Installing/updating dependencies..."
pip install -r requirements.txt --quiet

echo ""
echo "========================================"
echo "Starting FastAPI server..."
echo "Server will be available at:"
echo "http://127.0.0.1:8000"
echo ""
echo "API Documentation:"
echo "http://127.0.0.1:8000/docs"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python paraphrase_api.py
