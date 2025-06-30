# Face Detection Frontend Startup Script
Write-Host "Starting Face Detection Frontend..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "D:\MyCode\FaceDetection\frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red

npm run dev 