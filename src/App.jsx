import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WebVapt from './pages/WebVapt'
import M365Security from './pages/M365Security'
import CloudSecurity from './pages/CloudSecurity'
import ApiSecurity from './pages/ApiSecurity'
import Contact from './pages/Contact'

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
          <Route path="/web-vapt" element={<WebVapt />} />
          <Route path="/m365-security" element={<M365Security />} />
          <Route path="/cloud-security" element={<CloudSecurity />} />
          <Route path="/api-security" element={<ApiSecurity />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
