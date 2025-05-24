import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const stats = [
    { label: "Files Processed", value: "2.5M+", icon: "FileText" },
    { label: "Storage Available", value: "∞ GB", icon: "HardDrive" },
    { label: "Upload Speed", value: "Fast", icon: "Zap" },
    { label: "File Types", value: "All", icon: "Layers" }
  ]

  const features = [
    {
      icon: "Upload",
      title: "Drag & Drop Upload",
      description: "Simply drag files or click to upload multiple files at once with real-time progress tracking"
    },
    {
      icon: "FolderTree",
      title: "Smart Organization", 
      description: "Auto-organize files by type, create custom folders, and tag files for easy searching"
    },
    {
      icon: "Eye",
      title: "Instant Preview",
      description: "Preview images, documents, and videos without downloading. Quick file management made easy"
    },
    {
      icon: "Share2",
      title: "Secure Sharing",
      description: "Share files with customizable permissions and expiry dates. Full control over your content"
    }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
              <ApperIcon name="CloudUpload" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropVault
              </h1>
              <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">File Management Platform</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-800 shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-surface-600 dark:text-surface-400" 
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700"
            >
              <ApperIcon name="Info" className="w-4 h-4" />
              <span className="text-sm font-medium">Help</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Upload, Organize & Share
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Files Effortlessly
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Experience the most intuitive file management platform. Drag, drop, organize, and share your files with enterprise-grade security and lightning-fast performance.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <ApperIcon name={stat.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature Component */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <MainFeature />
      </motion.section>

      {/* Enhanced Features Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-surface-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              <span className="block">Powerful Features for</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Modern File Management
              </span>
            </h3>
            <p className="text-xl lg:text-2xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Everything you need to manage your files efficiently, securely, and collaboratively in one comprehensive platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group bg-white/90 backdrop-blur-sm dark:bg-surface-800/90 rounded-3xl p-8 sm:p-10 shadow-card border border-surface-100/50 dark:border-surface-700/50 hover:shadow-soft hover:bg-white dark:hover:bg-surface-800 transition-all duration-300"
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl flex items-center justify-center mb-8 group-hover:from-primary/20 group-hover:via-secondary/10 group-hover:to-accent/20 transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                  <ApperIcon name={feature.icon} className="w-9 h-9 sm:w-10 sm:h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6">
                  {feature.title}
                </h4>
                <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      {/* Enhanced Premium Footer */}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-surface-200 dark:border-surface-700"
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-surface-200/50 dark:border-surface-700/50 bg-surface-50/50 dark:bg-surface-900/50 backdrop-blur-sm"
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-soft border border-white/20">
              <ApperIcon name="CloudUpload" className="w-7 h-7 text-white" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <span className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DropMe
          </div>
          </motion.div>
          <p className="text-surface-600 dark:text-surface-400 text-base sm:text-lg font-medium">
            © 2024 DropMe. Premium file management made beautiful and simple.
        </div>
      </motion.footer>
    </div>
  )
}

export default Home