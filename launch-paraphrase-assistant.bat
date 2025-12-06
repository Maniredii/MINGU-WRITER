@echo off
REM ============================================================
REM Unified Launcher for Paraphrase Assistant
REM ============================================================
REM This script starts both the backend server and desktop app
REM in the correct order, with health checks and error handling.
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo  Paraphrase Assistant - Unified Launcher
echo ============================================================
echo.

REM Store the project root directory
set "PROJECT_ROOT=%~dp0"
cd /d "%PROJECT_ROOT%"

REM ============================================================
REM Step 1: Check Prerequisites
REM ============================================================

echo [Step 1/5] Checking prerequisites...
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)
echo   [OK] Python found: 
python --version
echo.

REM Check if executable exists
set "EXE_PATH=%PROJECT_ROOT%desktop-ui\ParaphraseApp\bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe"
if not exist "%EXE_PATH%" (
    echo [WARNING] Desktop executable not found!
    echo Expected location: %EXE_PATH%
    echo.
    echo Please build the executable first by running:
    echo   build-desktop-exe.bat
    echo.
    echo Alternatively, you can use start-desktop.bat to run with dotnet
    pause
    exit /b 1
)
echo   [OK] Desktop executable found
echo.

REM ============================================================
REM Step 2: Start Backend Server
REM ============================================================

echo [Step 2/5] Starting backend server...
echo.

REM Check if backend is already running
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo   [INFO] Backend is already running at http://localhost:8000
    echo.
    goto :skip_backend
)

REM Start backend in a new window
echo   Starting backend in new window...
start "Paraphrase Assistant - Backend Server" cmd /k "cd /d "%PROJECT_ROOT%backend" && python -m venv venv 2>nul && call venv\Scripts\activate && pip install -q -r requirements.txt && python paraphrase_api.py"

echo   Waiting for backend to be ready...
echo   (This may take 30-60 seconds on first run while downloading the AI model)
echo.

REM Wait for backend to be ready (max 120 seconds)
set /a counter=0
set /a max_wait=120

:wait_backend
timeout /t 2 /nobreak >nul
set /a counter+=2

curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] Backend is ready!
    echo.
    goto :skip_backend
)

if %counter% geq %max_wait% (
    echo.
    echo [ERROR] Backend failed to start within %max_wait% seconds
    echo Please check the backend window for error messages
    echo.
    pause
    exit /b 1
)

REM Show progress dots
set /a dots=counter/10
set "progress="
for /l %%i in (1,1,%dots%) do set "progress=!progress!."
echo   Waiting!progress! (%counter%s / %max_wait%s)
goto :wait_backend

:skip_backend

REM ============================================================
REM Step 3: Verify Backend Health
REM ============================================================

echo [Step 3/5] Verifying backend health...
echo.

curl -s http://localhost:8000/health
if %errorlevel% neq 0 (
    echo [ERROR] Backend health check failed
    pause
    exit /b 1
)
echo.
echo   [OK] Backend is healthy
echo.

REM ============================================================
REM Step 4: Launch Desktop Application
REM ============================================================

echo [Step 4/5] Launching desktop application...
echo.

start "" "%EXE_PATH%"
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start desktop application
    pause
    exit /b 1
)

echo   [OK] Desktop application launched
echo.

REM ============================================================
REM Step 5: Complete
REM ============================================================

echo [Step 5/5] Startup complete!
echo.
echo ============================================================
echo  Paraphrase Assistant is now running!
echo ============================================================
echo.
echo Backend API:  http://localhost:8000
echo Desktop App:  Running (check your taskbar)
echo.
echo HOW TO USE:
echo 1. Open any application (Notepad, Word, browser, etc.)
echo 2. Type and select some text
echo 3. Press Ctrl+Alt+P to paraphrase
echo.
echo To stop the application:
echo - Close the desktop app window
echo - Close the backend server window
echo.
echo ============================================================
echo.

REM Keep this window open for status
echo Press any key to close this launcher window...
pause >nul
