@echo off
echo ========================================
echo Paraphrase Assistant - Desktop App
echo ========================================
echo.

cd /d "%~dp0desktop-ui\ParaphraseApp"

echo Checking .NET SDK installation...
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: .NET SDK is not installed!
    echo.
    echo Please install .NET 6.0 SDK from:
    echo https://dotnet.microsoft.com/download/dotnet/6.0
    echo.
    echo After installation, restart this script.
    echo.
    pause
    exit /b 1
)

echo .NET SDK found!
echo.

echo Restoring NuGet packages...
dotnet restore

echo.
echo Building application...
dotnet build

if errorlevel 1 (
    echo.
    echo ERROR: Build failed!
    echo Please check the error messages above.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting Paraphrase Assistant...
echo ========================================
echo.
echo IMPORTANT: Make sure the backend server
echo is running before using the app!
echo.
echo To start backend: Double-click start-backend.bat
echo.
echo Press Ctrl+C to stop the application
echo.

dotnet run

pause
