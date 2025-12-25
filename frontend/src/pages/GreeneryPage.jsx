import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import './GreeneryPage.css'

const API_BASE = ''

function GreeneryPage() {
    const [result, setResult] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null)

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
        const file = e.dataTransfer.files[0]
        if (file) uploadFile(file)
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) uploadFile(file)
    }

    const uploadFile = async (file) => {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`${API_BASE}/api/greenery`, {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            setResult({
                imageUrl: `${API_BASE}${data.image_url}`,
                greeneryRate: data.greenery_rate
            })
        } catch (error) {
            console.error('Error:', error)
            alert('Error calculating greenery rate.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="greenery-page">
            {isLoading && <LoadingSpinner message="CALCULATING VEGETATION DENSITY..." />}

            <div className="container">
                <div className="page-title">
                    <h1>Greenery Index Calculation</h1>
                    <p>Upload aerial or satellite imagery to analyze vegetation density.</p>
                </div>

                <div className="glass-card upload-card">
                    {result && (
                        <>
                            <div className="result-panel">
                                <div className="result-image">
                                    <img src={result.imageUrl} alt="Analyzed Region" />
                                    <div className="scan-line"></div>
                                </div>

                                <div className="result-data">
                                    <span className="metric-label">Vegetation Density</span>
                                    <div className="metric-value">{result.greeneryRate}</div>

                                    <div className="progress-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: result.greeneryRate }}
                                        ></div>
                                    </div>

                                    <p className="analysis-info">
                                        <i className="fa-solid fa-check"></i> Analysis Complete<br />
                                        <i className="fa-solid fa-tree"></i> Bio-mass Detected
                                    </p>
                                </div>
                            </div>

                            <div className="divider">
                                <p>Analyze another region?</p>
                            </div>
                        </>
                    )}

                    <div
                        className={`drop-zone drop-zone-green ${isDragOver ? 'dragover' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-icon green">
                            <i className="fa-solid fa-satellite-dish"></i>
                        </div>
                        <p>Drag & drop image to scan</p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            hidden
                        />

                        <button className="btn btn-green" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
                            Select File
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link to="/" className="btn btn-secondary">
                            {result ? 'Return to HQ' : 'Go Back'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreeneryPage
