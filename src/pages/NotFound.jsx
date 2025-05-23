import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center">
            <ApperIcon name="FileX" className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-8xl font-bold text-surface-900 dark:text-white mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed"
          >
            The page you're looking for seems to have been moved, deleted, or doesn't exist. Let's get you back to uploading files!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-card group"
          >
            <ApperIcon name="Home" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700">
              <ApperIcon name="RefreshCw" className="w-4 h-4" />
              <span className="text-sm">Refresh Page</span>
            </button>
            
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700">
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span className="text-sm">Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound