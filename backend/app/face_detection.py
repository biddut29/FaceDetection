import cv2
import mediapipe as mp
import numpy as np
from PIL import Image
import io
import base64

class FaceDetector:
    def __init__(self):
        self.mp_face_detection = mp.solutions.face_detection
        self.mp_drawing = mp.solutions.drawing_utils
        self.face_detection = self.mp_face_detection.FaceDetection(
            model_selection=1, min_detection_confidence=0.5
        )
    
    def detect_faces(self, image_data):
        """
        Detect faces in an image and return bounding boxes
        """
        try:
            # Convert image data to numpy array
            if isinstance(image_data, bytes):
                nparr = np.frombuffer(image_data, np.uint8)
                image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            else:
                image = image_data
            
            # Convert BGR to RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Detect faces
            results = self.face_detection.process(image_rgb)
            
            faces = []
            if results.detections:
                height, width, _ = image.shape
                
                for detection in results.detections:
                    # Get bounding box coordinates
                    bbox = detection.location_data.relative_bounding_box
                    
                    # Convert relative coordinates to absolute
                    x = int(bbox.xmin * width)
                    y = int(bbox.ymin * height)
                    w = int(bbox.width * width)
                    h = int(bbox.height * height)
                    
                    # Ensure coordinates are within image bounds
                    x = max(0, x)
                    y = max(0, y)
                    w = min(w, width - x)
                    h = min(h, height - y)
                    
                    faces.append({
                        'bbox': [x, y, w, h],
                        'confidence': detection.score[0]
                    })
            
            return faces
            
        except Exception as e:
            print(f"Error in face detection: {e}")
            return []
    
    def draw_faces(self, image_data, faces):
        """
        Draw bounding boxes around detected faces
        """
        try:
            # Convert image data to numpy array
            if isinstance(image_data, bytes):
                nparr = np.frombuffer(image_data, np.uint8)
                image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            else:
                image = image_data.copy()
            
            # Draw bounding boxes
            for face in faces:
                x, y, w, h = face['bbox']
                cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                
                # Add confidence score
                confidence = face['confidence']
                cv2.putText(image, f'{confidence:.2f}', (x, y - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
            return image
            
        except Exception as e:
            print(f"Error drawing faces: {e}")
            return image_data
    
    def image_to_base64(self, image):
        """
        Convert OpenCV image to base64 string
        """
        try:
            # Convert BGR to RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Convert to PIL Image
            pil_image = Image.fromarray(image_rgb)
            
            # Convert to base64
            buffer = io.BytesIO()
            pil_image.save(buffer, format='JPEG')
            img_str = base64.b64encode(buffer.getvalue()).decode()
            
            return f"data:image/jpeg;base64,{img_str}"
            
        except Exception as e:
            print(f"Error converting image to base64: {e}")
            return None 