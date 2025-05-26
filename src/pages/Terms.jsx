import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const Terms = () => {
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
              <p className="text-xs text-surface-600 dark:text-surface-400">Terms of Service</p>
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
                Terms of Service
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
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Acceptance of Terms</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    By accessing and using DropMe, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Use License</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    Permission is granted to temporarily use DropMe for personal and commercial file management purposes. This license grants you:
                  </p>
                  <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                    <li>Upload and store files on our platform</li>
                    <li>Share files with other users</li>
                    <li>Organize and manage your content</li>
                    <li>Access your files from any device</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Prohibited Uses</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    You may not use our service:
                  </p>
                  <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To upload malicious software, viruses, or harmful code</li>
                    <li>To store copyrighted material without permission</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Service Availability</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    We strive to provide 99.9% uptime but do not guarantee uninterrupted service. We may temporarily suspend service for maintenance, updates, or other technical reasons.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Account Termination</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    We reserve the right to terminate accounts that violate these terms or engage in suspicious activity. Users may terminate their accounts at any time through their account settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Contact Information</h2>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at legal@dropme.com or through our <Link to="/contact" className="text-primary hover:text-primary-dark underline">contact page</Link>.
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

export default Terms