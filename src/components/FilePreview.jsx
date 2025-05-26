import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'
import { getFileIcon, getFileColor, formatFileSize, isImageFile, isVideoFile, isAudioFile, isTextFile } from '../utils/fileUtils'

const FilePreview = ({ file, onClose, onDownload }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const renderPreview = () => {
    if (isImageFile(file.type)) {
      return (
        <div className="max-w-4xl max-h-[70vh] mx-auto">
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-contain rounded-xl"
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true)
              setLoading(false)
            }}
          />
        </div>
      )
    }

    if (isVideoFile(file.type)) {
      return (
        <div className="max-w-4xl max-h-[70vh] mx-auto">
          <video
            controls
            className="w-full h-full rounded-xl"
            onLoadedData={() => setLoading(false)}
            onError={() => {
              setError(true)
              setLoading(false)
            }}
          >
            <source src={file.url} type={file.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    if (isAudioFile(file.type)) {
      return (
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="Music" className="w-16 h-16 text-primary" />
          </div>
          <audio
            controls
            className="w-full mb-4"
            onLoadedData={() => setLoading(false)}
            onError={() => {
              setError(true)
              setLoading(false)
            }}
          >
            <source src={file.url} type={file.type} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )
    }

    if (isTextFile(file.type, file.name)) {
      return (
        <div className="max-w-4xl max-h-[70vh] mx-auto">
          <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-6 h-full overflow-auto">
            <pre className="text-sm text-surface-900 dark:text-white whitespace-pre-wrap font-mono">
              {/* Note: In a real implementation, you'd read the file content */}
              File content preview would be displayed here.
              File: {file.name}
              Type: {file.type}
              Size: {formatFileSize(file.size)}
            </pre>
          </div>
        </div>
      )
    }

    // Default preview for other file types
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <ApperIcon name={getFileIcon(file.type)} className={`w-16 h-16 ${getFileColor(file.type)}`} />
        </div>
        <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
          {file.name}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4">
            <div className="text-surface-600 dark:text-surface-400 mb-1">File Size</div>
            <div className="font-semibold text-surface-900 dark:text-white">{formatFileSize(file.size)}</div>
          </div>
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4">
            <div className="text-surface-600 dark:text-surface-400 mb-1">File Type</div>
            <div className="font-semibold text-surface-900 dark:text-white">{file.type}</div>
          </div>
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4">
            <div className="text-surface-600 dark:text-surface-400 mb-1">Upload Date</div>
            <div className="font-semibold text-surface-900 dark:text-white">{format(file.uploadDate, 'MMM dd, yyyy')}</div>
          </div>
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4">
            <div className="text-surface-600 dark:text-surface-400 mb-1">Status</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Uploaded</div>
          </div>
        </div>
      </div>
    )
  }

  // Keyboard navigation for preview
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    // Simulate loading for non-media files
    if (!isImageFile(file.type) && !isVideoFile(file.type) && !isAudioFile(file.type)) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [file])

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-surface-800 rounded-3xl shadow-2xl border border-surface-200 dark:border-surface-700 max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getFileColor(file.type)} bg-current/10`}>
                <ApperIcon name={getFileIcon(file.type)} className={`w-5 h-5 ${getFileColor(file.type)}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white truncate max-w-md">
                  {file.name}
                </h2>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {formatFileSize(file.size)} • {format(file.uploadDate, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDownload(file)}
                className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-surface-600 dark:text-surface-400">Loading preview...</span>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Preview Error</h3>
                <p className="text-surface-600 dark:text-surface-400">Unable to load preview for this file.</p>
              </div>
            )}
            
            {!loading && !error && renderPreview()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FilePreview
