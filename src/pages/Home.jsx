import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FilePreview from '../components/FilePreview'

import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)

  const fileInputRef = useRef(null)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files) => {
    setUploading(true)
    const fileArray = Array.from(files)
    
    // Simulate upload process
    for (let file of fileArray) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate upload delay
      
      const fileUrl = URL.createObjectURL(file)
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        uploadDate: new Date(),
        progress: 100
      }

      
      setUploadedFiles(prev => [...prev, newFile])
      toast.success(`${file.name} uploaded successfully!`)
    }
    
    setUploading(false)
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    toast.success('File deleted successfully!')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const openPreview = (file) => {
    setPreviewFile(file)
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
    setPreviewFile(null)
  }

  const downloadFile = (file) => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`${file.name} downloaded successfully`)
  }



  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image'
    if (type.startsWith('video/')) return 'Video'
    if (type.startsWith('audio/')) return 'Music'
    if (type.includes('pdf')) return 'FileText'
    if (type.includes('document') || type.includes('word')) return 'FileText'
    return 'File'
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* App Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
              <ApperIcon name="CloudUpload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropVault
              </h1>
              <p className="text-xs text-surface-600 dark:text-surface-400">File Manager</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/docs" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200">
                Docs
              </Link>
              <Link to="/pricing" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200">
                Pricing
              </Link>
              <Link to="/status" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200">
                Status
              </Link>
            </nav>
            
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-surface-600 dark:text-surface-400" 
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main App Content */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Upload Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Upload Your Files
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400">
                Drag and drop files here or click to browse
              </p>
            </div>
            
            <div
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-surface-300 dark:border-surface-600 hover:border-primary/50 hover:bg-surface-50 dark:hover:bg-surface-800/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
              />
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <ApperIcon name="Upload" className="w-10 h-10 text-white" />
                </div>
                
                {uploading ? (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                      Uploading files...
                    </div>
                    <div className="w-32 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden mx-auto">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                      Drop files here or click to browse
                    </div>
                    <div className="text-surface-600 dark:text-surface-400 mb-6">
                      Support for all file types
                    </div>
                    <motion.button
                      onClick={onButtonClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Choose Files
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Files List */}
          {uploadedFiles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Your Files ({uploadedFiles.length})
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                  onClick={() => {
                    setUploadedFiles([])
                    toast.success('All files cleared!')
                  }}
                >
                  Clear All
                </motion.button>
              </div>
              
              <div className="grid gap-4">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                          <ApperIcon name={getFileIcon(file.type)} className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-surface-900 dark:text-white">
                            {file.name}
                          </h4>
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            {formatFileSize(file.size)} • Uploaded {file.uploadDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
                          onClick={() => openPreview(file)}

                        >
                          <ApperIcon name="Eye" className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
                          onClick={() => downloadFile(file)}

                        >
                          <ApperIcon name="Download" className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-xl bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-200"
                          onClick={() => deleteFile(file.id)}
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Empty State */}
          {uploadedFiles.length === 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="FolderOpen" className="w-12 h-12 text-surface-400 dark:text-surface-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                No files uploaded yet
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Upload your first file to get started with file management
              </p>
            </motion.section>
          )}

          {/* File Preview Modal */}
          {showPreview && previewFile && (
            <FilePreview
              file={previewFile}
              onClose={closePreview}
              onDownload={downloadFile}
            />
          )}

        </div>
      </motion.main>
    </div>
  )
}

export default Home