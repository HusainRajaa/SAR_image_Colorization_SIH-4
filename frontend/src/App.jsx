import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ResultPage from './pages/ResultPage'
import GreeneryPage from './pages/GreeneryPage'
import ChatbotPage from './pages/ChatbotPage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  const [result, setResult] = useState(null)

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage setResult={setResult} />} />
          <Route path="/result" element={<ResultPage result={result} />} />
          <Route path="/greenery" element={<GreeneryPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
