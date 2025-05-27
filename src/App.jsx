import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-0 via-primary-50/30 to-secondary-50/20 relative overflow-hidden">
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
  )
}

export default App