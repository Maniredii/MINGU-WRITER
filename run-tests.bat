@echo off
echo ========================================
echo Running Backend API Tests
echo ========================================
echo.

cd /d "%~dp0backend"

echo Checking if backend is running...
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Backend server is not running!
    echo.
    echo Please start the backend server first:
    echo   1. Double-click start-backend.bat
    echo   2. Wait for "Model loaded successfully!"
    echo   3. Run this script again
    echo.
    pause
    exit /b 1
)

echo Backend is running!
echo.

if not exist "venv\" (
    echo ERROR: Virtual environment not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Installing test dependencies...
pip install pytest requests --quiet

echo.
echo ========================================
echo Running tests...
echo ========================================
echo.

pytest test_api.py -v

echo.
echo ========================================
echo Tests complete!
echo ========================================
echo.
pause
