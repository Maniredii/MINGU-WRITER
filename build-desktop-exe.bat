@echo off
REM ============================================================
REM Build Script for Paraphrase Assistant Desktop Executable
REM ============================================================
REM This script creates a standalone .exe file for the desktop app
REM The resulting executable includes the .NET runtime and can run
REM without requiring .NET to be installed on the target machine.
REM ============================================================

echo.
echo ============================================================
echo  Building Paraphrase Assistant Desktop Executable
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

echo [1/4] Checking .NET SDK version...
dotnet --version
echo.

echo [2/4] Navigating to desktop app directory...
cd /d "%~dp0desktop-ui\ParaphraseApp"
if %errorlevel% neq 0 (
    echo [ERROR] Could not find desktop-ui\ParaphraseApp directory
    pause
    exit /b 1
)
echo Current directory: %CD%
echo.

echo [3/4] Restoring NuGet packages...
dotnet restore
if %errorlevel% neq 0 (
    echo [ERROR] Failed to restore packages
    pause
    exit /b 1
)
echo.

echo [4/4] Publishing as standalone executable...
echo This may take a few minutes...
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
echo %CD%\bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe
echo.
echo File size: 
dir /b /s bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe | findstr /v "Directory" >nul 2>&1
if %errorlevel% equ 0 (
    for %%A in (bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe) do echo %%~zA bytes
)
echo.
echo NEXT STEPS:
echo 1. The .exe can run on any Windows 10/11 machine (no .NET installation needed)
echo 2. Make sure the backend is running before launching the .exe
echo 3. Use launch-paraphrase-assistant.bat to start both components automatically
echo.
echo ============================================================
pause
