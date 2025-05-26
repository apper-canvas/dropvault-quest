import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const Status = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const services = [
    {
      name: "File Upload Service",
      status: "operational",
      uptime: "99.98%",
      responseTime: "245ms",
      description: "Core file upload and processing functionality"
    },
    {
      name: "Storage System",
      status: "operational", 
      uptime: "99.99%",
      responseTime: "12ms",
      description: "Distributed file storage and retrieval"
    },
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.97%",
      responseTime: "89ms",
      description: "Authentication and API management"
    },
    {
      name: "Preview Service",
      status: "operational",
      uptime: "99.95%",
      responseTime: "156ms",
      description: "File preview and thumbnail generation"
    },
    {
      name: "Sharing Platform",
      status: "operational",
      uptime: "99.96%",
      responseTime: "203ms",
      description: "File sharing and collaboration features"
    },
    {
      name: "Backup System",
      status: "operational",
      uptime: "100%",
      responseTime: "67ms",
      description: "Automated backup and disaster recovery"
    }
  ]

  const incidents = [
    {
      date: "2024-01-15",
      title: "Brief Service Degradation",
      status: "resolved",
      duration: "12 minutes",
      description: "Temporary slowdown in file upload processing due to high traffic volume. All services restored to normal operation."
    },
    {
      date: "2024-01-08",
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      description: "Planned infrastructure upgrade to improve performance and reliability. No data loss occurred."
    },
    {
      date: "2023-12-22",
      title: "Database Connection Issue",
      status: "resolved",
      duration: "8 minutes",
      description: "Temporary database connectivity issue causing authentication delays. Resolved with failover to backup systems."
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'degraded': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'outage': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-surface-600 bg-surface-50 border-surface-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle'
      case 'degraded': return 'AlertTriangle'
      case 'outage': return 'XCircle'
      default: return 'Clock'
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-surface-200 dark:border-surface-700 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="CloudUpload" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DropMe Status
                </h1>
                <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">System Status Dashboard</p>
              </div>
            </Link>
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
            
            <Link to="/" className="btn-secondary text-sm px-4 py-2">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Overall Status */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
                System Status
              </h1>
              <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                Real-time status and performance monitoring for all DropMe services
              </p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-card border border-surface-100 dark:border-surface-700">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                  All Systems Operational
                </h2>
              </div>
              <p className="text-center text-surface-600 dark:text-surface-400 mb-8">
                All services are running normally with optimal performance
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">99.98%</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Overall Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">< 200ms</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">0</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Active Incidents</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Service Status */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Service Status</h2>
            <div className="grid gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-xl border ${getStatusColor(service.status)}`}>
                        <ApperIcon name={getStatusIcon(service.status)} className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{service.status}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-surface-900 dark:text-white font-medium mb-1">
                        {service.uptime} uptime
                      </div>
                      <div className="text-xs text-surface-600 dark:text-surface-400">
                        {service.responseTime} avg response
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recent Incidents */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                        {incident.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-surface-600 dark:text-surface-400">
                        <span>{incident.date}</span>
                        <span>•</span>
                        <span>Duration: {incident.duration}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-xl border text-sm font-medium ${
                      incident.status === 'resolved' || incident.status === 'completed' 
                        ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                        : 'text-amber-600 bg-amber-50 border-amber-200'
                    }`}>
                      {incident.status}
                    </div>
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                    {incident.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Performance Metrics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Activity" className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-white mb-2">156ms</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Avg API Response</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Upload" className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-white mb-2">245ms</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Upload Processing</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Database" className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-white mb-2">12ms</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Database Query</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Server" className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-white mb-2">99.98%</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">System Uptime</div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}

export default Status