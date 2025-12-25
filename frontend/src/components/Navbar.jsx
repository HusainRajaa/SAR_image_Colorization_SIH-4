import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <i className="fa-solid fa-earth-americas"></i>
                SAR Image Colorization
            </Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/greenery">Greenery Index</Link>
                <Link to="/chatbot">AI Chatbot</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="nav-right">SIH-24 Winner</div>
        </nav>
    )
}

export default Navbar
