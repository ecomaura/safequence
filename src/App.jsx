import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Vapt from './pages/Vapt'
import M365Security from './pages/M365Security'
import CloudSecurity from './pages/CloudSecurity'
import ApiSecurity from './pages/ApiSecurity'
import Contact from './pages/Contact'
import ChatWidget from './components/ChatWidget'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return // let in-page anchors (e.g. /#approach) scroll natively
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-0)]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vapt" element={<Vapt />} />
          <Route path="/web-vapt" element={<Navigate to="/vapt" replace />} />
          <Route path="/m365-security" element={<M365Security />} />
          <Route path="/cloud-security" element={<CloudSecurity />} />
          <Route path="/api-security" element={<ApiSecurity />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
           <Footer />
      <ChatWidget />
    </div>
  )
}
