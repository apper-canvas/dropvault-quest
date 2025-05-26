import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    },
    {
      icon: "Users",
      title: "Real-time Collaboration",
      description: "Work together seamlessly with team members, real-time editing, and instant file synchronization"
    },
    {
      icon: "GitBranch",
      title: "Version Control",
      description: "Automatic version tracking for all files. Never lose important changes with complete revision history"
    },
    {
      icon: "Layers",
      title: "Bulk Operations",
      description: "Perform actions on multiple files at once. Batch upload, download, move, and organize efficiently"
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "Bank-level encryption, compliance certifications, and advanced security controls for peace of mind"
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

      {/* Hero Section with Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-6 leading-tight">
                Upload, Organize & Share
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-2">
                  Your Files Effortlessly
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 mb-8 leading-relaxed max-w-2xl">
                Experience the most intuitive file management platform. Drag, drop, organize, and share your files with enterprise-grade security and lightning-fast performance.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg">
                {/* Main Hero Visual */}
                <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                  {/* Central Upload Zone */}
                  <div className="bg-white/80 dark:bg-surface-800/80 rounded-2xl p-8 shadow-soft border border-surface-100 dark:border-surface-700 mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ApperIcon name="Upload" className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Drop files here</div>
                      <div className="w-full h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 1, duration: 2 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating File Icons */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -left-4 w-12 h-12 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-100 dark:border-surface-700 flex items-center justify-center"
                  >
                    <ApperIcon name="FileText" className="w-6 h-6 text-blue-500" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute -top-2 -right-6 w-10 h-10 bg-white dark:bg-surface-800 rounded-lg shadow-card border border-surface-100 dark:border-surface-700 flex items-center justify-center"
                  >
                    <ApperIcon name="Image" className="w-5 h-5 text-emerald-500" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [-5, 15, -5] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-3 -left-6 w-14 h-14 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-100 dark:border-surface-700 flex items-center justify-center"
                  >
                    <ApperIcon name="Video" className="w-7 h-7 text-purple-500" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [8, -12, 8] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                    className="absolute -bottom-1 -right-4 w-11 h-11 bg-white dark:bg-surface-800 rounded-lg shadow-card border border-surface-100 dark:border-surface-700 flex items-center justify-center"
                  >
                    <ApperIcon name="Music" className="w-6 h-6 text-orange-500" />
                  </motion.div>

                  {/* Floating Orbs */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary blur-xl"></div>
                  </motion.div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute -z-10 top-8 left-8 w-24 h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
                <div className="absolute -z-10 bottom-8 right-8 w-32 h-32 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-2xl"></div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
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

      {/* Professional Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-surface-200/50 dark:border-surface-700/50 bg-surface-50/50 dark:bg-surface-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-soft border border-white/20">
                  <ApperIcon name="CloudUpload" className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  DropMe
                </span>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-base leading-relaxed mb-6 max-w-md">
                The most intuitive file management platform. Upload, organize, and share your files with enterprise-grade security and lightning-fast performance.
              </p>
              <div className="flex items-center gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white dark:bg-surface-800 rounded-xl flex items-center justify-center shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-200"
                >
                  <ApperIcon name="Twitter" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white dark:bg-surface-800 rounded-xl flex items-center justify-center shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-200"
                >
                  <ApperIcon name="Github" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white dark:bg-surface-800 rounded-xl flex items-center justify-center shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-200"
                >
                  <ApperIcon name="Linkedin" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    API
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-4">
                Legal & Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    Help Center
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="pt-8 border-t border-surface-200/50 dark:border-surface-700/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                © 2024 DropMe. All rights reserved. Premium file management made beautiful and simple.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-surface-600 dark:text-surface-400">
                  Made with ❤️ for creators
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-surface-600 dark:text-surface-400">All systems operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home