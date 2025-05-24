import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-surface-900 dark:via-indigo-950/20 dark:to-purple-950/10">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 sm:mb-12 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl flex items-center justify-center shadow-soft border border-primary/10">
            <ApperIcon name="FileX" className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-surface-900 dark:text-white mb-6 leading-none"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-700 dark:text-surface-300 mb-6"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 mb-12 leading-relaxed font-medium max-w-lg mx-auto"
          >
            The page you're looking for seems to have been moved, deleted, or doesn't exist. Let's get you back to your beautiful file management dashboard!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold rounded-2xl transition-all duration-300 shadow-soft hover:shadow-card group text-lg min-w-64"
            >
              <ApperIcon name="Home" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Back to DropMe</span>
            </Link>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 rounded-2xl hover:bg-white dark:hover:bg-surface-800 transition-all duration-300 border border-surface-200 dark:border-surface-700 font-semibold"
            >
              <ApperIcon name="RefreshCw" className="w-5 h-5" />
              <span>Refresh Page</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 rounded-2xl hover:bg-white dark:hover:bg-surface-800 transition-all duration-300 border border-surface-200 dark:border-surface-700 font-semibold"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              <span>Go Back</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound