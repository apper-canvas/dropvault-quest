import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState(new Set())
  const [uploadProgress, setUploadProgress] = useState({})
  const [currentFolder, setCurrentFolder] = useState({ id: 'root', name: 'All Files' })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const fileInputRef = useRef(null)

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image'
    if (type.startsWith('video/')) return 'Video'
    if (type.startsWith('audio/')) return 'Music'
    if (type.includes('pdf')) return 'FileText'
    if (type.includes('word') || type.includes('document')) return 'FileText'
    if (type.includes('excel') || type.includes('spreadsheet')) return 'BarChart3'
    if (type.includes('zip') || type.includes('rar')) return 'Archive'
    return 'File'
  }

  const getFileColor = (type) => {
    if (type.startsWith('image/')) return 'text-green-500'
    if (type.startsWith('video/')) return 'text-purple-500'
    if (type.startsWith('audio/')) return 'text-orange-500'
    if (type.includes('pdf')) return 'text-red-500'
    if (type.includes('word') || type.includes('document')) return 'text-blue-500'
    if (type.includes('excel') || type.includes('spreadsheet')) return 'text-emerald-500'
    if (type.includes('zip') || type.includes('rar')) return 'text-yellow-600'
    return 'text-surface-500'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const simulateUpload = (file) => {
    const fileId = Date.now() + Math.random()
    let progress = 0
    
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadProgress(prev => {
          const updated = { ...prev }
          delete updated[fileId]
          return updated
        })
        toast.success(`${file.name} uploaded successfully!`)
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: progress
      }))
    }, 200)

    return fileId
  }

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList).map(file => {
      const fileId = Date.now() + Math.random()
      const fileObj = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        folderId: currentFolder.id,
        url: URL.createObjectURL(file),
        isShared: false,
        file: file
      }
      
      // Start upload simulation
      simulateUpload(file)
      
      return fileObj
    })

    setFiles(prev => [...prev, ...newFiles])
    toast.info(`${newFiles.length} file(s) added to upload queue`)
  }, [currentFolder.id])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const deleteFiles = () => {
    if (selectedFiles.size === 0) return
    
    setFiles(prev => prev.filter(file => !selectedFiles.has(file.id)))
    setSelectedFiles(new Set())
    toast.success(`${selectedFiles.size} file(s) deleted`)
  }

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) {
        newSet.delete(fileId)
      } else {
        newSet.add(fileId)
      }
      return newSet
    })
  }

  const filteredFiles = files
    .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'size':
          return b.size - a.size
        case 'date':
          return b.uploadDate - a.uploadDate
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mb-12"
      >
        <div
          className={`file-upload-zone relative p-8 sm:p-12 lg:p-16 rounded-3xl text-center transition-all duration-300 ${
            dragActive ? 'file-upload-active' : ''
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
            onChange={handleFileInput}
            className="hidden"
            accept="*/*"
          />
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: dragActive ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
              <ApperIcon 
                name={dragActive ? "Download" : "Upload"} 
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-primary transition-all duration-300 ${
                  dragActive ? 'animate-bounce-gentle' : ''
                }`} 
              />
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-2 sm:mb-4">
                {dragActive ? "Drop your files here" : "Upload your files"}
              </h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
                Drag and drop files here, or click to browse your computer
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ApperIcon name="FolderOpen" className="w-5 h-5" />
                <span>Browse Files</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ApperIcon name="Camera" className="w-5 h-5" />
                <span>Upload Photos</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Controls Bar */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700 mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-surface-900 text-surface-900 dark:text-white text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
                <option value="date">Sort by Date</option>
                <option value="type">Sort by Type</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-surface-100 dark:bg-surface-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-surface-800 shadow-card text-primary' 
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                  }`}
                >
                  <ApperIcon name="Grid3x3" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-surface-800 shadow-card text-primary' 
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                  }`}
                >
                  <ApperIcon name="List" className="w-4 h-4" />
                </button>
              </div>

              {/* Actions */}
              {selectedFiles.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={deleteFiles}
                  className="flex items-center gap-2 px-3 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 text-sm font-medium"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                  <span>Delete ({selectedFiles.size})</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* File Count & Size */}
          <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-surface-600 dark:text-surface-400">
              <span className="flex items-center gap-2">
                <ApperIcon name="FileText" className="w-4 h-4" />
                {filteredFiles.length} files
              </span>
              <span className="flex items-center gap-2">
                <ApperIcon name="HardDrive" className="w-4 h-4" />
                {formatFileSize(filteredFiles.reduce((acc, file) => acc + file.size, 0))} total
              </span>
              {selectedFiles.size > 0 && (
                <span className="flex items-center gap-2 text-primary">
                  <ApperIcon name="CheckCircle" className="w-4 h-4" />
                  {selectedFiles.size} selected
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Progress */}
      <AnimatePresence>
        {Object.keys(uploadProgress).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700 mb-6 sm:mb-8"
          >
            <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Upload" className="w-5 h-5 text-primary" />
              Uploading Files
            </h4>
            <div className="space-y-3">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-700 dark:text-surface-300">Uploading...</span>
                    <span className="text-surface-500 dark:text-surface-400">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Files Display */}
      {files.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-100 dark:border-surface-700 overflow-hidden"
        >
          {viewMode === 'grid' ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredFiles.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`group relative bg-surface-50 dark:bg-surface-900 rounded-2xl p-4 sm:p-6 border-2 transition-all duration-200 cursor-pointer ${
                      selectedFiles.has(file.id)
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                    }`}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    {/* Selection checkbox */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        selectedFiles.has(file.id)
                          ? 'bg-primary border-primary'
                          : 'border-surface-300 dark:border-surface-600 group-hover:border-primary'
                      } flex items-center justify-center`}>
                        {selectedFiles.has(file.id) && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>

                    {/* File icon */}
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white dark:bg-surface-800 rounded-2xl flex items-center justify-center shadow-soft mb-3">
                        <ApperIcon 
                          name={getFileIcon(file.type)} 
                          className={`w-8 h-8 sm:w-10 sm:h-10 ${getFileColor(file.type)}`} 
                        />
                      </div>
                      
                      {/* File preview for images */}
                      {file.type.startsWith('image/') && (
                        <div className="absolute inset-4 sm:inset-6 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-800">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* File details */}
                    <div className="relative z-10 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-xl p-3">
                      <h4 className="text-sm font-semibold text-surface-900 dark:text-white truncate mb-1">
                        {file.name}
                      </h4>
                      <div className="space-y-1 text-xs text-surface-500 dark:text-surface-400">
                        <div>{formatFileSize(file.size)}</div>
                        <div>{format(file.uploadDate, 'MMM dd, yyyy')}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">
                      <input
                        type="checkbox"
                        checked={selectedFiles.size === filteredFiles.length && filteredFiles.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFiles(new Set(filteredFiles.map(f => f.id)))
                          } else {
                            setSelectedFiles(new Set())
                          }
                        }}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">Size</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-surface-700 dark:text-surface-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file, index) => (
                    <motion.tr
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-900/50 transition-colors ${
                        selectedFiles.has(file.id) ? 'bg-primary/5 dark:bg-primary/10' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedFiles.has(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                          className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getFileColor(file.type)} bg-current/10`}>
                            <ApperIcon name={getFileIcon(file.type)} className={`w-4 h-4 ${getFileColor(file.type)}`} />
                          </div>
                          <span className="text-sm font-medium text-surface-900 dark:text-white truncate max-w-xs">
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-surface-600 dark:text-surface-400">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="py-4 px-6 text-sm text-surface-600 dark:text-surface-400">
                        {file.type.split('/')[0]}
                      </td>
                      <td className="py-4 px-6 text-sm text-surface-600 dark:text-surface-400">
                        {format(file.uploadDate, 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                            <ApperIcon name="Download" className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                            <ApperIcon name="Share2" className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16 lg:py-20"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-surface-100 dark:bg-surface-800 rounded-3xl flex items-center justify-center">
            <ApperIcon name="FolderOpen" className="w-12 h-12 sm:w-16 sm:h-16 text-surface-400 dark:text-surface-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
            No files uploaded yet
          </h3>
          <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md mx-auto">
            Upload your first files using the drag and drop area above or click the browse button to get started.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default MainFeature