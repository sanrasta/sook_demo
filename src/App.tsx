import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LiveShowPage from './pages/LiveShowPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live" element={<LiveShowPage />} />
      </Routes>
    </Router>
  )
}

export default App

