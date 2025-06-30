# Face Detection Application

A modern face detection application built with Python (FastAPI) backend and Next.js frontend.

## Features

- Real-time face detection using OpenCV and MediaPipe
- Upload images for face detection
- Webcam face detection
- Modern, responsive UI
- RESTful API backend

## Project Structure

```
FaceDetection/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── face_detection.py # Face detection logic
│   │   └── requirements.txt
│   └── uploads/            # Uploaded images storage
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── styles/
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `POST /detect-faces` - Upload and detect faces in an image
- `GET /health` - Health check endpoint

## Technologies Used

### Backend
- FastAPI
- OpenCV
- MediaPipe
- Python-multipart
- Uvicorn

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Axios

## Usage

1. Start both backend and frontend servers
2. Open the application in your browser
3. Upload an image or use webcam for face detection
4. View detected faces with bounding boxes

## License

MIT 