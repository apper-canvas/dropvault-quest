import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const Docs = () => {
  const quickStartSteps = [
    {
      step: '1',
      title: 'Create Account',
      description: 'Sign up for a free DropMe account to get started',
      icon: 'UserPlus'
    },
    {
      step: '2',
      title: 'Get API Key',
      description: 'Generate your API key from the dashboard settings',
      icon: 'Key'
    },
    {
      step: '3',
      title: 'Make First Request',
      description: 'Upload your first file using our simple API',
      icon: 'Upload'
    },
    {
      step: '4',
      title: 'Integrate',
      description: 'Build amazing file management features',
      icon: 'Code'
    }
  ]

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/files/upload',
      description: 'Upload a file to your account',
      icon: 'Upload'
    },
    {
      method: 'GET',
      endpoint: '/api/files',
      description: 'List all your files with pagination',
      icon: 'Files'
    },
    {
      method: 'GET',
      endpoint: '/api/files/{id}',
      description: 'Get detailed information about a file',
      icon: 'FileText'
    },
    {
      method: 'DELETE',
      endpoint: '/api/files/{id}',
      description: 'Delete a file from your account',
      icon: 'Trash2'
    }
  ]

  const sdks = [
    {
      name: 'JavaScript/Node.js',
      icon: 'Code',
      command: 'npm install dropme-sdk',
      color: 'text-yellow-600'
    },
    {
      name: 'Python',
      icon: 'Code',
      command: 'pip install dropme-python',
      color: 'text-blue-600'
    },
    {
      name: 'PHP',
      icon: 'Code',
      command: 'composer require dropme/sdk',
      color: 'text-purple-600'
    },
    {
      name: 'cURL',
      icon: 'Terminal',
      command: 'curl -X POST https://api.dropme.com/files',
      color: 'text-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-surface-900 dark:via-indigo-950/20 dark:to-purple-950/10">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-surface-200/50 dark:border-surface-700/50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <ApperIcon name="CloudUpload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropMe
              </h1>
              <p className="text-xs text-surface-600 dark:text-surface-400">Documentation</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/docs/api"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200"
            >
              <ApperIcon name="Book" className="w-4 h-4" />
              <span className="text-sm font-medium">API Reference</span>
            </Link>
            
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-surface-900 dark:text-white mb-6">
              Developer
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-400 leading-relaxed max-w-3xl mx-auto">
              Everything you need to integrate DropMe's powerful file management API into your applications.
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Quick Start Guide
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Get up and running with DropMe API in minutes
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickStartSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 border border-surface-100/50 dark:border-surface-700/50 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <ApperIcon name={step.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">
                    Step {step.step}
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Authentication */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 border border-surface-100/50 dark:border-surface-700/50">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
                Authentication
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-surface-600 dark:text-surface-400 mb-6">
                    DropMe API uses API keys for authentication. Include your API key in the Authorization header of each request.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-surface-900 dark:text-white mb-2">
                        Getting Your API Key
                      </h4>
                      <ol className="list-decimal list-inside text-surface-600 dark:text-surface-400 space-y-1 text-sm">
                        <li>Log in to your DropMe dashboard</li>
                        <li>Navigate to Settings → API Keys</li>
                        <li>Click "Generate New Key"</li>
                        <li>Copy and securely store your key</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-white mb-4">
                    Example Request
                  </h4>
                  <div className="bg-surface-900 dark:bg-black rounded-xl p-4 overflow-x-auto">
                    <pre className="text-emerald-400 text-sm">
                      <code>{`curl -X GET https://api.dropme.com/files \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Popular Endpoints */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Popular Endpoints
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Most commonly used API endpoints
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 border border-surface-100/50 dark:border-surface-700/50 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={endpoint.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                          endpoint.method === 'GET' ? 'bg-emerald-100 text-emerald-700' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-surface-600 dark:text-surface-400">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <p className="text-surface-700 dark:text-surface-300 text-sm">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SDKs */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                SDKs & Libraries
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Official SDKs for your favorite programming languages
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sdks.map((sdk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 border border-surface-100/50 dark:border-surface-700/50 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <ApperIcon name={sdk.icon} className={`w-6 h-6 ${sdk.color}`} />
                    <h3 className="font-semibold text-surface-900 dark:text-white">
                      {sdk.name}
                    </h3>
                  </div>
                  <div className="bg-surface-900 dark:bg-black rounded-lg p-3">
                    <code className="text-emerald-400 text-sm font-mono">
                      {sdk.command}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  )
}

export default Docs