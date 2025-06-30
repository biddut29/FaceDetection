# Face Detection Backend Startup Script
Write-Host "Starting Face Detection Backend..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "D:\MyCode\FaceDetection\backend"

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "venv\Scripts\Activate.ps1"

# Install dependencies if needed
if (-not (Test-Path "venv\Lib\site-packages\fastapi")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

# Start the server
Write-Host "Starting FastAPI server..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red

python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 