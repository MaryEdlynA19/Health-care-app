#!/bin/bash

# Healthcare Appointment System - Backend Startup Script

echo "🏥 Starting Healthcare Appointment System Backend..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🚀 Starting API server on http://localhost:3000"
echo "📋 Press Ctrl+C to stop the server"
echo ""
npm start
