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
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-teal-50/30 to-cyan-50/20 dark:from-surface-900 dark:via-teal-950/20 dark:to-cyan-950/10">
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