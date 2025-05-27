import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState, useEffect, createContext, useContext } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'

import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import ContactUs from './pages/ContactUs'

import Pricing from './pages/Pricing'
import Docs from './pages/Docs'
import DocsApi from './pages/DocsApi'

import Status from './pages/Status'

// Theme Context
const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}



function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent() {
  const { darkMode } = useTheme()
  return (


    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''} bg-gradient-to-br from-surface-0 via-primary-50/30 to-secondary-50/20 dark:from-surface-950 dark:via-surface-900 dark:to-surface-800 relative overflow-hidden`}>

      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-secondary-300/20 to-transparent rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-accent-300/20 to-transparent rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Home />} />

        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<ContactUs />} />
          <Route path="/status" element={<Status />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/api" element={<DocsApi />} />
      </Routes>

      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16 !important"
        toastClassName="!rounded-2xl !shadow-soft !border !border-surface-100"
        bodyClassName="!text-sm !font-medium !text-surface-700"
        progressClassName="bg-primary"
      />
    </div>
    </div>
  )
}

export default App