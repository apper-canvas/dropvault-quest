import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-surface-900 dark:via-indigo-950/20 dark:to-purple-950/10">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-surface-200/50 dark:border-surface-700/50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <ApperIcon name="CloudUpload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropMe
              </h1>
              <p className="text-xs text-surface-600 dark:text-surface-400">Privacy Policy</p>
            </div>
          </Link>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl shadow-card border border-surface-100/50 dark:border-surface-700/50 p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-black text-surface-900 dark:text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed">
                Last updated: December 2024
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Information We Collect</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    We collect information you provide directly to us, such as when you create an account, upload files, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                    <li>Account information (email, name, password)</li>
                    <li>Files and content you upload to our service</li>
                    <li>Usage data and analytics</li>
                    <li>Device and browser information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">How We Use Your Information</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    We use the information we collect to provide, maintain, and improve our services.
                  </p>
                  <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                    <li>Provide and operate our file management services</li>
                    <li>Process and store your uploaded files securely</li>
                    <li>Send important service updates and notifications</li>
                    <li>Improve our platform based on usage patterns</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Data Security</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    We implement industry-standard security measures to protect your data, including encryption at rest and in transit, regular security audits, and secure data centers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Your Rights</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    You have the right to access, update, or delete your personal information at any time.
                  </p>
                  <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Contact Us</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at privacy@dropme.com or through our <Link to="/contact" className="text-primary hover:text-primary-dark underline">contact page</Link>.
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default Privacy