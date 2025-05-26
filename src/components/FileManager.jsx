import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'
import FileUpload from './FileUpload'
import FilePreview from './FilePreview'
import { useFileManager } from '../hooks/useFileManager'
import { getFileIcon, getFileColor, formatFileSize } from '../utils/fileUtils'

const FileManager = () => {
  const {
    files,
    dragActive,
    viewMode,
    selectedFiles,
    uploadProgress,
    searchTerm,
    sortBy,
    previewFile,
    showPreview,
    fileInputRef,
    filteredFiles,
    setViewMode,
    setSearchTerm,
    setSortBy,
    setSelectedFiles,
    handleFiles,
    handleDrag,
    handleDrop,
    handleFileInput,
    deleteFiles,
    deleteFile,
    toggleFileSelection,
    openPreview,
    closePreview,
    downloadFile
  } = useFileManager()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Upload Component */}
      <FileUpload
        dragActive={dragActive}
        uploadProgress={uploadProgress}
        fileInputRef={fileInputRef}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        handleFileInput={handleFileInput}
      />

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

                    {/* Preview button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        openPreview(file)
                      }}
                      className="absolute top-3 left-3 z-10 p-2 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-xl shadow-soft border border-surface-200/50 dark:border-surface-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <ApperIcon name="Eye" className="w-4 h-4 text-primary" />
                    </motion.button>

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
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openPreview(file)}
                            className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                          >
                            <ApperIcon name="Eye" className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => downloadFile(file)}
                            className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                          >
                            <ApperIcon name="Download" className="w-4 h-4" />
                          </motion.button>
                          <button className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                            <ApperIcon name="Share2" className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteFile(file.id, file.name)}
                            className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                          >
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
          className="text-center py-16 sm:py-20 lg:py-24"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 sm:mb-12 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-900 rounded-3xl flex items-center justify-center shadow-soft border border-surface-200 dark:border-surface-700">
            <ApperIcon name="CloudUpload" className="w-16 h-16 sm:w-20 sm:h-20 text-surface-400 dark:text-surface-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-700 dark:text-surface-300 mb-6">
            Ready to get started?
          </h3>
          <p className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your first files using the beautiful drag and drop area above, or click the browse button to select multiple files from your device.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary inline-flex items-center gap-3 text-lg"
            >
              <ApperIcon name="Upload" className="w-6 h-6" />
              <span>Upload Your First Files</span>
            </button>
          </motion.div>
        </motion.div>
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
  )
}

export default FileManager
