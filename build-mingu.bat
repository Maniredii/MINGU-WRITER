@echo off
REM ============================================================
REM Build Script for MINGU Auto-Typer
REM ============================================================

echo.
echo ============================================================
echo  Building MINGU Auto-Typer Executable
echo ============================================================
echo.

REM Check if .NET SDK is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] .NET SDK is not installed or not in PATH
    echo Please install .NET 6.0 SDK from:
    echo https://dotnet.microsoft.com/download/dotnet/6.0
    echo.
    pause
    exit /b 1
)

echo [1/3] Checking .NET SDK version...
dotnet --version
echo.

echo [2/3] Navigating to MINGU directory...
cd /d "%~dp0MINGU"
if %errorlevel% neq 0 (
    echo [ERROR] Could not find MINGU directory
    pause
    exit /b 1
)
echo Current directory: %CD%
echo.

echo [3/3] Publishing as standalone executable...
echo This may take 2-3 minutes...
echo.
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo  BUILD SUCCESSFUL!
echo ============================================================
echo.
echo The executable has been created at:
echo %CD%\bin\Release\net6.0-windows\win-x64\publish\MinguApp.exe
echo.
echo NEXT STEPS:
echo 1. Double-click the .exe to run MINGU
echo 2. Open Notepad or Word on the side
echo 3. Type text in MINGU and click "Start typing into active window"
echo 4. Click in Notepad/Word within 3 seconds
echo 5. Watch it auto-type!
echo.
echo ============================================================
pause
