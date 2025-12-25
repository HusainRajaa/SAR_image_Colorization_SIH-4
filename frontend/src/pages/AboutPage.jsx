import { Link } from 'react-router-dom'
import './AboutPage.css'

function AboutPage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <div className="badge-row">
                        <span className="hero-badge"><i className="fa-solid fa-trophy"></i> SIH 2024 Winner</span>
                    </div>
                    <h1>SAR Image Colorization</h1>
                    <p className="hero-subtitle">
                        Transforming grayscale satellite radar imagery into meaningful color visualizations using Deep Learning
                    </p>
                    <div className="hero-actions">
                        <a href="https://github.com/HusainRajaa/SAR_image_Colorization_SIH-4" target="_blank" rel="noopener noreferrer" className="btn">
                            <i className="fa-brands fa-github"></i> View on GitHub
                        </a>
                        <Link to="/" className="btn btn-outline">
                            <i className="fa-solid fa-play"></i> Try Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="about-section">
                <div className="section-header">
                    <span className="section-number">01</span>
                    <h2>Project Overview</h2>
                </div>
                <div className="overview-grid">
                    <div className="overview-card">
                        <div className="overview-icon">
                            <i className="fa-solid fa-satellite"></i>
                        </div>
                        <h3>What is SAR?</h3>
                        <p>
                            Synthetic Aperture Radar (SAR) is a form of radar that creates high-resolution images
                            regardless of weather conditions or daylight. It's widely used for earth observation,
                            disaster monitoring, and environmental analysis.
                        </p>
                    </div>
                    <div className="overview-card">
                        <div className="overview-icon">
                            <i className="fa-solid fa-palette"></i>
                        </div>
                        <h3>The Problem</h3>
                        <p>
                            SAR images are inherently grayscale, making visual interpretation challenging for
                            analysts. Identifying terrain features, vegetation, and water bodies requires expertise
                            and significant time.
                        </p>
                    </div>
                    <div className="overview-card">
                        <div className="overview-icon">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <h3>Our Solution</h3>
                        <p>
                            We developed an AI-powered colorization system using GANs (Generative Adversarial Networks)
                            that automatically adds realistic colors to SAR imagery, making analysis faster and more intuitive.
                        </p>
                    </div>
                </div>
            </section>

            {/* ML Workflow Section */}
            <section className="about-section workflow-section">
                <div className="section-header">
                    <span className="section-number">02</span>
                    <h2>ML Architecture</h2>
                </div>
                <div className="workflow-diagram">
                    <div className="workflow-step">
                        <div className="step-icon input">
                            <i className="fa-solid fa-image"></i>
                        </div>
                        <div className="step-content">
                            <h4>Input</h4>
                            <p>Grayscale SAR Image (256×256)</p>
                        </div>
                    </div>
                    <div className="workflow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                    <div className="workflow-step">
                        <div className="step-icon encoder">
                            <i className="fa-solid fa-compress"></i>
                        </div>
                        <div className="step-content">
                            <h4>Encoder</h4>
                            <p>Feature extraction with Conv2D layers</p>
                        </div>
                    </div>
                    <div className="workflow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                    <div className="workflow-step">
                        <div className="step-icon attention">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div className="step-content">
                            <h4>Self-Attention</h4>
                            <p>Query-Key-Value attention mechanism</p>
                        </div>
                    </div>
                    <div className="workflow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                    <div className="workflow-step">
                        <div className="step-icon decoder">
                            <i className="fa-solid fa-expand"></i>
                        </div>
                        <div className="step-content">
                            <h4>Decoder</h4>
                            <p>Upsampling to RGB output</p>
                        </div>
                    </div>
                    <div className="workflow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                    <div className="workflow-step">
                        <div className="step-icon output">
                            <i className="fa-solid fa-palette"></i>
                        </div>
                        <div className="step-content">
                            <h4>Output</h4>
                            <p>Colorized RGB Image (256×256×3)</p>
                        </div>
                    </div>
                </div>
                <div className="architecture-details">
                    <div className="arch-card">
                        <h4><i className="fa-solid fa-layer-group"></i> Network Layers</h4>
                        <ul>
                            <li><strong>Encoder:</strong> 3 Conv2D blocks (64→128→256 channels)</li>
                            <li><strong>Attention:</strong> Self-attention with learnable γ parameter</li>
                            <li><strong>Decoder:</strong> 2 TransConv2D + 1 Conv2D (256→128→64→3)</li>
                        </ul>
                    </div>
                    <div className="arch-card">
                        <h4><i className="fa-solid fa-gears"></i> Techniques Used</h4>
                        <ul>
                            <li>Instance Normalization for stable training</li>
                            <li>Sliding Window with 32px overlap</li>
                            <li>Tanh activation for [-1, 1] output range</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="about-section">
                <div className="section-header">
                    <span className="section-number">03</span>
                    <h2>Technology Stack</h2>
                </div>
                <div className="tech-grid">
                    <div className="tech-category">
                        <h4>Machine Learning</h4>
                        <div className="tech-items">
                            <span className="tech-item"><i className="fa-brands fa-python"></i> Python</span>
                            <span className="tech-item">PyTorch</span>
                            <span className="tech-item">OpenCV</span>
                            <span className="tech-item">NumPy</span>
                        </div>
                    </div>
                    <div className="tech-category">
                        <h4>Backend</h4>
                        <div className="tech-items">
                            <span className="tech-item">Flask</span>
                            <span className="tech-item">REST API</span>
                            <span className="tech-item">Gunicorn</span>
                        </div>
                    </div>
                    <div className="tech-category">
                        <h4>Frontend</h4>
                        <div className="tech-items">
                            <span className="tech-item"><i className="fa-brands fa-react"></i> React</span>
                            <span className="tech-item">Vite</span>
                            <span className="tech-item">Three.js</span>
                            <span className="tech-item">CSS3</span>
                        </div>
                    </div>
                    <div className="tech-category">
                        <h4>Deployment</h4>
                        <div className="tech-items">
                            <span className="tech-item"><i className="fa-brands fa-docker"></i> Docker</span>
                            <span className="tech-item">HuggingFace</span>
                            <span className="tech-item"><i className="fa-brands fa-github"></i> GitHub</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="about-section journey-section">
                <div className="section-header">
                    <span className="section-number">04</span>
                    <h2>Our SIH 2024 Journey</h2>
                </div>
                <div className="journey-content">
                    <div className="journey-text">
                        <div className="journey-milestone">
                            <div className="milestone-icon"><i className="fa-solid fa-lightbulb"></i></div>
                            <div className="milestone-content">
                                <h4>The Beginning</h4>
                                <p>
                                    Smart India Hackathon 2024 presented us with a challenging problem statement:
                                    making SAR satellite imagery more accessible and interpretable for analysts and researchers.
                                </p>
                            </div>
                        </div>
                        <div className="journey-milestone">
                            <div className="milestone-icon"><i className="fa-solid fa-code"></i></div>
                            <div className="milestone-content">
                                <h4>36 Hours of Innovation</h4>
                                <p>
                                    Our team worked intensively to develop a GAN-based solution, implementing
                                    self-attention mechanisms to capture long-range dependencies in SAR imagery
                                    and produce realistic colorizations.
                                </p>
                            </div>
                        </div>
                        <div className="journey-milestone">
                            <div className="milestone-icon"><i className="fa-solid fa-trophy"></i></div>
                            <div className="milestone-content">
                                <h4>Victory</h4>
                                <p>
                                    Our innovative approach and working prototype impressed the judges,
                                    leading to us winning the competition. This project demonstrates the
                                    power of AI in solving real-world remote sensing challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="journey-image">
                        <div className="image-frame">
                            <img src="/sih24.png" alt="Team at SIH 2024" className="team-photo" />
                        </div>
                        <p className="image-caption">Team Sarva Conquerors at SIH 2024</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <h2>Ready to Experience It?</h2>
                <p>Try our SAR image colorization tool and see the AI in action</p>
                <div className="cta-actions">
                    <Link to="/" className="btn btn-large">
                        <i className="fa-solid fa-rocket"></i> Launch App
                    </Link>
                    <a href="https://github.com/HusainRajaa/SAR_image_Colorization_SIH-4" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-large">
                        <i className="fa-brands fa-github"></i> Star on GitHub
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="about-footer">
                <p>Built with ❤️ by <a href="https://github.com/HusainRajaa" target="_blank" rel="noopener noreferrer">Husain Raja</a></p>
                <p className="footer-sub">Smart India Hackathon 2024 Winner</p>
            </footer>
        </div>
    )
}

export default AboutPage
