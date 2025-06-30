# Face Detection Application Setup Guide

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Quick Start

### Option 1: Using Batch Scripts (Windows)

1. **Start the Backend:**
   - Double-click `start_backend.bat`
   - This will create a virtual environment, install dependencies, and start the server
   - The backend will be available at http://localhost:8000

2. **Start the Frontend:**
   - Double-click `start_frontend.bat`
   - This will install dependencies and start the development server
   - The frontend will be available at http://localhost:3000

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the server:
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and go to http://localhost:3000
2. Upload an image or use your webcam to detect faces
3. View the detection results with bounding boxes around detected faces

## Features

- **Image Upload**: Upload images from your device
- **Webcam Detection**: Use your webcam for real-time face detection
- **Multiple Face Detection**: Detect multiple faces in a single image
- **Confidence Scores**: View confidence scores for each detected face
- **Download Results**: Download the annotated image with detected faces
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /detect-faces` - Upload image for face detection
- `POST /detect-faces-base64` - Detect faces in base64 encoded image

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Backend: Change port in the uvicorn command
   - Frontend: Change port in package.json scripts

2. **CORS errors:**
   - Ensure both servers are running
   - Check that the frontend is accessing the correct backend URL

3. **Webcam not working:**
   - Ensure HTTPS is used in production
   - Check browser permissions for camera access

4. **Face detection not working:**
   - Ensure the image contains clear, front-facing faces
   - Try adjusting the detection confidence threshold in `face_detection.py`

### Dependencies

The application uses:
- **Backend**: FastAPI, OpenCV, MediaPipe, NumPy, Pillow
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Axios

## Development

### Backend Development

- The main API is in `backend/app/main.py`
- Face detection logic is in `backend/app/face_detection.py`
- API documentation is available at http://localhost:8000/docs

### Frontend Development

- The main page is in `frontend/src/app/page.tsx`
- Styles are in `frontend/src/app/globals.css`
- Configuration files are in the root of the frontend directory

## License

MIT License 