function LoadingSpinner({ message = "Processing..." }) {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>{message}</p>
        </div>
    )
}

export default LoadingSpinner
