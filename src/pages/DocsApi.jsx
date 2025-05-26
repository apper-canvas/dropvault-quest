import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const DocsApi = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('upload')

  const endpoints = {
    upload: {
      title: 'Upload File',
      method: 'POST',
      url: '/api/files/upload',
      description: 'Upload a single file to your DropMe account',
      parameters: [
        { name: 'file', type: 'File', required: true, description: 'The file to upload' },
        { name: 'folder_id', type: 'string', required: false, description: 'ID of the folder to upload to' },
        { name: 'public', type: 'boolean', required: false, description: 'Whether the file should be publicly accessible' }
      ],
      requestExample: `curl -X POST https://api.dropme.com/files/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/your/file.jpg" \
  -F "folder_id=folder_123" \
  -F "public=true"`,
      responseExample: `{
  "success": true,
  "data": {
    "id": "file_abc123",
    "name": "file.jpg",
    "size": 1024000,
    "type": "image/jpeg",
    "url": "https://cdn.dropme.com/file_abc123.jpg",
    "public": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
}`
    },
    list: {
      title: 'List Files',
      method: 'GET',
      url: '/api/files',
      description: 'Retrieve a paginated list of your files',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20, max: 100)' },
        { name: 'folder_id', type: 'string', required: false, description: 'Filter by folder ID' },
        { name: 'type', type: 'string', required: false, description: 'Filter by file type (image, video, document, etc.)' }
      ],
      requestExample: `curl -X GET "https://api.dropme.com/files?page=1&limit=20&type=image" \
  -H "Authorization: Bearer YOUR_API_KEY"`,
      responseExample: `{
  "success": true,
  "data": {
    "files": [
      {
        "id": "file_abc123",
        "name": "photo.jpg",
        "size": 1024000,
        "type": "image/jpeg",
        "url": "https://cdn.dropme.com/file_abc123.jpg",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 97,
      "per_page": 20
    }
  }
}`
    },
    get: {
      title: 'Get File',
      method: 'GET',
      url: '/api/files/{id}',
      description: 'Retrieve detailed information about a specific file',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The unique file ID' }
      ],
      requestExample: `curl -X GET https://api.dropme.com/files/file_abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"`,
      responseExample: `{
  "success": true,
  "data": {
    "id": "file_abc123",
    "name": "document.pdf",
    "size": 2048000,
    "type": "application/pdf",
    "url": "https://cdn.dropme.com/file_abc123.pdf",
    "download_url": "https://api.dropme.com/files/file_abc123/download",
    "public": false,
    "folder_id": "folder_123",
    "metadata": {
      "pages": 10,
      "author": "John Doe"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`
    },
    delete: {
      title: 'Delete File',
      method: 'DELETE',
      url: '/api/files/{id}',
      description: 'Permanently delete a file from your account',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The unique file ID' }
      ],
      requestExample: `curl -X DELETE https://api.dropme.com/files/file_abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"`,
      responseExample: `{
  "success": true,
  "message": "File deleted successfully"
}`
    }
  }

  const errorCodes = [
    { code: 400, message: 'Bad Request', description: 'Invalid request parameters or missing required fields' },
    { code: 401, message: 'Unauthorized', description: 'Invalid or missing API key' },
    { code: 403, message: 'Forbidden', description: 'Insufficient permissions for this operation' },
    { code: 404, message: 'Not Found', description: 'The requested resource was not found' },
    { code: 413, message: 'Payload Too Large', description: 'File size exceeds the maximum allowed limit' },
    { code: 429, message: 'Too Many Requests', description: 'Rate limit exceeded' },
    { code: 500, message: 'Internal Server Error', description: 'An unexpected error occurred on our servers' }
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
              <p className="text-xs text-surface-600 dark:text-surface-400">API Reference</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/docs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700"
            >
              <ApperIcon name="Book" className="w-4 h-4" />
              <span className="text-sm font-medium">Documentation</span>
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-surface-900 dark:text-white mb-6">
              API Reference
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-400 leading-relaxed max-w-3xl mx-auto">
              Complete reference for DropMe's REST API. All endpoints, parameters, and response formats.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 border border-surface-100/50 dark:border-surface-700/50 sticky top-8">
                <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                  Endpoints
                </h3>
                <nav className="space-y-2">
                  {Object.entries(endpoints).map(([key, endpoint]) => (
                    <button
                      key={key}
                      onClick={() => setActiveEndpoint(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeEndpoint === key
                          ? 'bg-primary text-white'
                          : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                          endpoint.method === 'GET' ? 'bg-emerald-100 text-emerald-700' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {endpoint.method}
                        </span>
                        <span>{endpoint.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 border border-surface-100/50 dark:border-surface-700/50">
                {endpoints[activeEndpoint] && (
                  <div>
                    {/* Endpoint Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-mono font-medium ${
                          endpoints[activeEndpoint].method === 'GET' ? 'bg-emerald-100 text-emerald-700' :
                          endpoints[activeEndpoint].method === 'POST' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {endpoints[activeEndpoint].method}
                        </span>
                        <code className="text-lg font-mono text-surface-600 dark:text-surface-400">
                          {endpoints[activeEndpoint].url}
                        </code>
                      </div>
                      <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
                        {endpoints[activeEndpoint].title}
                      </h2>
                      <p className="text-surface-600 dark:text-surface-400">
                        {endpoints[activeEndpoint].description}
                      </p>
                    </div>

                    {/* Parameters */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                        Parameters
                      </h3>
                      <div className="space-y-4">
                        {endpoints[activeEndpoint].parameters.map((param, index) => (
                          <div key={index} className="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="text-sm font-mono text-primary">
                                {param.name}
                              </code>
                              <span className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">
                                {param.type}
                              </span>
                              {param.required && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Request Example */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                        Request Example
                      </h3>
                      <div className="bg-surface-900 dark:bg-black rounded-xl p-4 overflow-x-auto">
                        <pre className="text-emerald-400 text-sm">
                          <code>{endpoints[activeEndpoint].requestExample}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Response Example */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                        Response Example
                      </h3>
                      <div className="bg-surface-900 dark:bg-black rounded-xl p-4 overflow-x-auto">
                        <pre className="text-emerald-400 text-sm">
                          <code>{endpoints[activeEndpoint].responseExample}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Codes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 border border-surface-100/50 dark:border-surface-700/50"
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
                  Error Codes
                </h2>
                <div className="space-y-4">
                  {errorCodes.map((error, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-mono font-medium">
                        {error.code}
                      </span>
                      <div>
                        <h4 className="font-semibold text-surface-900 dark:text-white mb-1">
                          {error.message}
                        </h4>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">
                          {error.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default DocsApi