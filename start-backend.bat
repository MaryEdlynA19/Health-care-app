@echo off
REM Healthcare Appointment System - Backend Startup Script (Windows)

echo 🏥 Starting Healthcare Appointment System Backend...
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the server
echo 🚀 Starting API server on http://localhost:3000
echo 📋 Press Ctrl+C to stop the server
echo.
call npm start
