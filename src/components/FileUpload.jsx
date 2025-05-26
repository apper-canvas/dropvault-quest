import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const FileUpload = ({ 
  dragActive, 
  uploadProgress, 
  fileInputRef, 
  handleDrag, 
  handleDrop, 
  handleFileInput 
}) => {
  return (
    <>
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
    </>
  )
}

export default FileUpload
