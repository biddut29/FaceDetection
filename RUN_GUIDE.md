# Face Detection Application - Run Guide

## Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Step-by-Step Setup

### Step 1: Backend Setup (Python/FastAPI)

1. **Open a new terminal/command prompt**

2. **Navigate to the backend directory:**
   ```bash
   cd D:\MyCode\FaceDetection\backend
   ```

3. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

4. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

5. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

6. **Start the backend server:**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Verify backend is running:**
   - Open browser and go to: http://localhost:8000
   - You should see: `{"message": "Face Detection API is running!"}`
   - API documentation: http://localhost:8000/docs

### Step 2: Frontend Setup (Next.js)

1. **Open a NEW terminal/command prompt** (keep the backend running)

2. **Navigate to the frontend directory:**
   ```bash
   cd D:\MyCode\FaceDetection\frontend
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

5. **Verify frontend is running:**
   - Open browser and go to: http://localhost:3000
   - You should see the Face Detection App interface

## Quick Start Scripts (Windows)

### Option 1: Use the provided batch files

1. **Start Backend:**
   - Double-click `start_backend.bat`
   - Wait for the server to start

2. **Start Frontend:**
   - Double-click `start_frontend.bat`
   - Wait for the server to start

### Option 2: Manual commands

**Terminal 1 (Backend):**
```bash
cd D:\MyCode\FaceDetection\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd D:\MyCode\FaceDetection\frontend
npm install
npm run dev
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "No module named uvicorn" Error
**Problem:** You're not in the virtual environment or dependencies aren't installed.

**Solution:**
```bash
cd D:\MyCode\FaceDetection\backend
venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. "Could not read package.json" Error
**Problem:** You're in the wrong directory.

**Solution:**
```bash
cd D:\MyCode\FaceDetection\frontend
npm install
```

#### 3. Port Already in Use
**Problem:** Port 8000 or 3000 is already occupied.

**Solution:**
- Backend: Change port in the uvicorn command
  ```bash
  python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
  ```
- Frontend: Change port in package.json or use
  ```bash
  npm run dev -- --port 3001
  ```

#### 4. Virtual Environment Issues
**Problem:** Virtual environment not activating properly.

**Solution:**
```bash
# Remove and recreate virtual environment
Remove-Item -Recurse -Force venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### 5. CORS Errors
**Problem:** Frontend can't connect to backend.

**Solution:**
- Ensure both servers are running
- Check that backend is on port 8000
- Check that frontend is on port 3000
- Verify the backend URL in the frontend code

## Verification Steps

### Backend Verification
1. Open http://localhost:8000
2. Should see: `{"message": "Face Detection API is running!"}`
3. Open http://localhost:8000/health
4. Should see: `{"status": "healthy", "timestamp": "..."}`

### Frontend Verification
1. Open http://localhost:3000
2. Should see the Face Detection App interface
3. Try uploading an image
4. Should be able to detect faces

## File Structure Check

Ensure you have this structure:
```
FaceDetection/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── face_detection.py
│   │   └── requirements.txt
│   └── venv/ (created after setup)
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── globals.css
│   ├── package.json
│   └── next.config.js
├── start_backend.bat
├── start_frontend.bat
└── RUN_GUIDE.md
```

## Usage

1. **Upload Image:**
   - Click "Choose File" or drag an image
   - Click "Detect Faces"
   - View results with bounding boxes

2. **Use Webcam:**
   - Click "Start Webcam"
   - Click "Capture & Detect"
   - View real-time face detection

3. **Download Results:**
   - Click the download button on the result image
   - Save the annotated image

## Stopping the Application

1. **Stop Backend:** Press `Ctrl+C` in the backend terminal
2. **Stop Frontend:** Press `Ctrl+C` in the frontend terminal
3. **Deactivate Virtual Environment:** Run `deactivate` in the backend terminal

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify you're in the correct directories
4. Check that both servers are running on the correct ports 