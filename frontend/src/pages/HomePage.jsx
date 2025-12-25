import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Earth3D from '../components/Earth3D'
import LoadingSpinner from '../components/LoadingSpinner'
import './HomePage.css'

const API_BASE = ''

function HomePage({ setResult }) {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('')
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) handleFileChange(droppedFile)
    }

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) handleFileChange(selectedFile)
    }

    const handleFileChange = (file) => {
        setFile(file)
        setFileName(file.name)

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target.result)
        reader.readAsDataURL(file)
    }

    const clearFile = (e) => {
        e.stopPropagation()
        setFile(null)
        setFileName(null)
        setPreview(null)
    }

    const simulateProgress = () => {
        setProgress(0)
        const stages = [
            { progress: 15, status: 'Analyzing image structure...' },
            { progress: 35, status: 'Applying neural network...' },
            { progress: 60, status: 'Generating color maps...' },
            { progress: 80, status: 'Blending patches...' },
            { progress: 95, status: 'Finalizing output...' },
        ]

        stages.forEach((stage, i) => {
            setTimeout(() => {
                setProgress(stage.progress)
                setStatus(stage.status)
            }, i * 800)
        })
    }

    const handleUpload = async () => {
        if (!file) {
            alert('Please select an image first!')
            return
        }

        setIsLoading(true)
        simulateProgress()

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`${API_BASE}/api/colorize`, {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            setProgress(100)
            setStatus('Complete!')

            setTimeout(() => {
                setResult({
                    uploadedUrl: `${API_BASE}${data.uploaded_url}`,
                    colorizedUrl: `${API_BASE}${data.colorized_url}`,
                    greeneryRate: data.greenery_rate
                })
                navigate('/result')
            }, 500)
        } catch (error) {
            console.error('Error:', error)
            alert('Error processing image. Please try again.')
            setIsLoading(false)
        }
    }

    return (
        <div className="home-page">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="progress-ring">
                            <svg viewBox="0 0 100 100">
                                <circle className="progress-bg" cx="50" cy="50" r="45" />
                                <circle
                                    className="progress-bar"
                                    cx="50" cy="50" r="45"
                                    style={{ strokeDashoffset: 283 - (283 * progress / 100) }}
                                />
                            </svg>
                            <span className="progress-text">{progress}%</span>
                        </div>
                        <p className="loading-status">{status}</p>
                        <div className="loading-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            )}

            <Earth3D />

            <div className="ui-layer">
                <main className="main-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="gradient-text">SAR Image</span> Colorization
                        </h1>
                        <p className="hero-subtitle">Transform grayscale radar imagery into vibrant color using AI</p>
                    </div>

                    <div className="glass-card upload-card">
                        <div
                            className={`drop-zone ${isDragOver ? 'dragover' : ''} ${preview ? 'has-preview' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !preview && fileInputRef.current?.click()}
                        >
                            {preview ? (
                                <div className="preview-container">
                                    <img src={preview} alt="Preview" className="image-preview" />
                                    <div className="preview-overlay">
                                        <button className="preview-remove" onClick={clearFile}>
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                        <div className="preview-info">
                                            <i className="fa-solid fa-file-image"></i>
                                            <span>{fileName}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="upload-icon">
                                        <i className="fa-solid fa-cloud-arrow-up"></i>
                                    </div>

                                    <h2 className="upload-title">Upload SAR Image</h2>
                                    <p className="upload-text">Drag & drop your SAR image here</p>

                                    <div className="upload-or">
                                        <span>or</span>
                                    </div>

                                    <button className="btn browse-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
                                        <i className="fa-solid fa-folder-open"></i> Browse Files
                                    </button>

                                    <div className="upload-formats">
                                        <span><i className="fa-solid fa-check"></i> PNG</span>
                                        <span><i className="fa-solid fa-check"></i> JPG</span>
                                        <span><i className="fa-solid fa-check"></i> TIFF</span>
                                    </div>
                                </>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                hidden
                            />
                        </div>

                        {preview && (
                            <button className="btn btn-upload full-width" onClick={handleUpload}>
                                <i className="fa-solid fa-wand-magic-sparkles"></i> Colorize Image
                            </button>
                        )}

                        <div className="feature-cards">
                            <a href="/greenery" className="feature-card">
                                <div className="feature-icon green">
                                    <i className="fa-solid fa-leaf"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Greenery Analysis</h3>
                                    <p>Calculate vegetation density</p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </a>
                            <a href="/chatbot" className="feature-card">
                                <div className="feature-icon purple">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>AI Assistant</h3>
                                    <p>Ask about SAR technology</p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="tech-badges">
                        <span className="badge"><i className="fa-solid fa-brain"></i> Deep Learning</span>
                        <span className="badge"><i className="fa-solid fa-satellite"></i> SAR Processing</span>
                        <span className="badge"><i className="fa-solid fa-trophy"></i> SIH-24 Winner</span>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomePage
