import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ResultPage.css'

function ResultPage({ result }) {
    const [sliderPosition, setSliderPosition] = useState(50)

    if (!result) {
        return (
            <div className="result-page">
                <div className="container">
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div className="empty-state">
                            <i className="fa-solid fa-image"></i>
                            <h2>No Result Available</h2>
                            <p>Please upload an image first to see the colorization result.</p>
                            <Link to="/" className="btn">
                                <i className="fa-solid fa-arrow-left"></i> Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value)
    }

    return (
        <div className="result-page">
            <div className="container">
                <div className="result-header">
                    <h1>Colorization Complete</h1>
                    <p>Your SAR image has been transformed</p>
                </div>

                <div className="glass-card result-card">
                    {/* Image Comparison Slider */}
                    <div className="comparison-container">
                        <div className="comparison-label left">
                            <i className="fa-solid fa-satellite"></i> Original
                        </div>
                        <div className="comparison-label right">
                            <i className="fa-solid fa-wand-magic-sparkles"></i> Colorized
                        </div>

                        <div className="comparison-wrapper">
                            <img
                                src={result.colorizedUrl}
                                alt="Colorized"
                                className="comparison-image"
                            />
                            <div
                                className="comparison-overlay"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <img
                                    src={result.uploadedUrl}
                                    alt="Original"
                                    className="comparison-image"
                                />
                            </div>

                            <div
                                className="comparison-slider"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="slider-line"></div>
                                <div className="slider-handle">
                                    <i className="fa-solid fa-grip-lines-vertical"></i>
                                </div>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPosition}
                                onChange={handleSliderChange}
                                className="slider-input"
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="stats-grid">
                        <div className="stat-card green">
                            <div className="stat-icon">
                                <i className="fa-solid fa-leaf"></i>
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Greenery Index</span>
                                <span className="stat-value">{result.greeneryRate}</span>
                            </div>
                        </div>

                        <div className="stat-card purple">
                            <div className="stat-icon">
                                <i className="fa-solid fa-check-circle"></i>
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Status</span>
                                <span className="stat-value">Success</span>
                            </div>
                        </div>

                        <div className="stat-card blue">
                            <div className="stat-icon">
                                <i className="fa-solid fa-microchip"></i>
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Model</span>
                                <span className="stat-value">GAN-v2.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="actions">
                        <a
                            href={result.colorizedUrl}
                            download="colorized_output.png"
                            className="btn btn-secondary"
                        >
                            <i className="fa-solid fa-download"></i> Download Image
                        </a>
                        <Link to="/" className="btn">
                            <i className="fa-solid fa-rotate-right"></i> Process Another
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultPage
