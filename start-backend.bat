@echo off
echo ========================================
echo Starting Paraphrase API Backend
echo ========================================
echo.

cd /d "%~dp0backend"

if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Installing/updating dependencies...
pip install -r requirements.txt --quiet

echo.
echo ========================================
echo Starting FastAPI server...
echo Server will be available at:
echo http://127.0.0.1:8000
echo.
echo API Documentation:
echo http://127.0.0.1:8000/docs
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python paraphrase_api.py

pause
