'use client'

import { useState, useRef } from 'react'
import axios from 'axios'

interface Face {
  bbox: [number, number, number, number]
  confidence: number
}

interface DetectionResult {
  success: boolean
  faces_detected: number
  faces: Face[]
  annotated_image: string
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [webcamActive, setWebcamActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post('http://localhost:8000/detect-faces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while processing the image')
    } finally {
      setLoading(false)
    }
  }

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setWebcamActive(true)
      }
    } catch (err) {
      setError('Unable to access webcam')
    }
  }

  const stopWebcam = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setWebcamActive(false)
    }
  }

  const captureAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    const base64Image = canvas.toDataURL('image/jpeg')

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:8000/detect-faces-base64', {
        image: base64Image
      })

      setResult(response.data)
      setPreview(base64Image)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while processing the image')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!result?.annotated_image) return

    const link = document.createElement('a')
    link.href = result.annotated_image
    link.download = 'face-detection-result.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Face Detection App
          </h1>
          <p className="text-lg text-gray-600">
            Upload an image or use your webcam to detect faces
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              <button
                onClick={handleUpload}
                disabled={!selectedFile || loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <span>📤</span>
                )}
                Detect Faces
              </button>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Or Use Webcam</h3>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {!webcamActive ? (
                  <button
                    onClick={startWebcam}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    📷 Start Webcam
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={captureAndDetect}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <span>📸</span>
                      )}
                      Capture & Detect
                    </button>
                    <button
                      onClick={stopWebcam}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Stop Webcam
                    </button>
                  </div>
                )}
              </div>

              {webcamActive && (
                <div className="mt-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Detection Results</h2>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-green-700 font-medium">
                    {result.faces_detected} face{result.faces_detected !== 1 ? 's' : ''} detected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Original Image</h3>
                  {preview && (
                    <img
                      src={preview}
                      alt="Original"
                      className="w-full rounded-lg border"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Detected Faces</h3>
                  {result.annotated_image && (
                    <div className="relative">
                      <img
                        src={result.annotated_image}
                        alt="Detected faces"
                        className="w-full rounded-lg border"
                      />
                      <button
                        onClick={downloadImage}
                        className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                        title="Download result"
                      >
                        💾
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {result.faces.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Face Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.faces.map((face, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">
                          <p><strong>Face {index + 1}</strong></p>
                          <p>Confidence: {(face.confidence * 100).toFixed(1)}%</p>
                          <p>Position: ({face.bbox[0]}, {face.bbox[1]})</p>
                          <p>Size: {face.bbox[2]} × {face.bbox[3]} pixels</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 