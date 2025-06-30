from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from face_detection import FaceDetector
import os
from datetime import datetime

app = FastAPI(
    title="Face Detection API",
    description="A FastAPI application for detecting faces in images",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize face detector
face_detector = FaceDetector()

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Face Detection API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/detect-faces")
async def detect_faces(file: UploadFile = File(...)):
    """
    Upload an image and detect faces in it
    """
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image data
        image_data = await file.read()
        
        # Detect faces
        faces = face_detector.detect_faces(image_data)
        
        # Draw faces on image
        annotated_image = face_detector.draw_faces(image_data, faces)
        
        # Convert to base64
        base64_image = face_detector.image_to_base64(annotated_image)
        
        # Save original image
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"uploads/{timestamp}_{file.filename}"
        with open(filename, "wb") as f:
            f.write(image_data)
        
        return JSONResponse(content={
            "success": True,
            "faces_detected": len(faces),
            "faces": faces,
            "annotated_image": base64_image,
            "original_filename": file.filename,
            "saved_filename": filename
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/detect-faces-base64")
async def detect_faces_base64(image_data: dict):
    """
    Detect faces in a base64 encoded image
    """
    try:
        import base64
        
        # Decode base64 image
        if "data:image" in image_data["image"]:
            # Remove data URL prefix
            base64_string = image_data["image"].split(",")[1]
        else:
            base64_string = image_data["image"]
        
        image_bytes = base64.b64decode(base64_string)
        
        # Detect faces
        faces = face_detector.detect_faces(image_bytes)
        
        # Draw faces on image
        annotated_image = face_detector.draw_faces(image_bytes, faces)
        
        # Convert to base64
        base64_image = face_detector.image_to_base64(annotated_image)
        
        return JSONResponse(content={
            "success": True,
            "faces_detected": len(faces),
            "faces": faces,
            "annotated_image": base64_image
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 