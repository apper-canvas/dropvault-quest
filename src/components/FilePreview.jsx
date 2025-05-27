import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { Document, Page, pdfjs } from 'react-pdf'
import mammoth from 'mammoth'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { saveAs } from 'file-saver'
import ApperIcon from './ApperIcon'
import { 
  getFileIcon, 
  getFileColor, 
  formatFileSize, 
  isImageFile, 
  isVideoFile, 
  isAudioFile, 
  isPDFFile,
  isDocumentFile,
  isCodeFile,
  getLanguageFromExtension,
  canPreviewFile,
  getPreviewType
} from '../utils/fileUtils'

import { toast } from 'react-toastify'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const FilePreview = ({ file, onClose, onDownload }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [documentContent, setDocumentContent] = useState('')
  const [textContent, setTextContent] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)


  const previewType = getPreviewType(file.type, file.name)

  // Load document content for DOC files
  const loadDocumentContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(file.url)
      const arrayBuffer = await response.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      setDocumentContent(result.value)
      setLoading(false)
    } catch (err) {
      console.error('Error loading document:', err)
      setError('Failed to load document content')
      setLoading(false)
      toast.error('Failed to load document preview')
    }
  }

  // Load text content for text/code files
  const loadTextContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(file.url)
      const text = await response.text()
      setTextContent(text)
      setLoading(false)
    } catch (err) {
      console.error('Error loading text:', err)
      setError('Failed to load text content')
      setLoading(false)
      toast.error('Failed to load file content')
    }
  }

  // PDF loading handlers
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
    toast.success('PDF loaded successfully')
  }

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error)
    setError('Failed to load PDF')
    setLoading(false)
    toast.error('Failed to load PDF preview')
  }

  const renderPreview = () => {
    if (error) {
      return (
        <div className="preview-error">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Preview Error</h3>
          <p className="text-surface-600 dark:text-surface-400">{error}</p>
          <button 
            onClick={() => downloadFile(file)}
            className="mt-4 btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="Download" className="w-4 h-4" />
            Download File
          </button>
        </div>
      )
    }

    switch (previewType) {
      case 'image':
        return (
          <div className="max-w-4xl max-h-[70vh] mx-auto">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-full object-contain rounded-xl shadow-soft"
              onLoad={() => {
                setLoading(false)
                toast.success('Image loaded successfully')
              }}
              onError={() => {
                setError('Failed to load image')
                setLoading(false)
                toast.error('Failed to load image preview')
              }}
            />
          </div>
        )

      case 'video':
        return (
          <div className="max-w-4xl max-h-[70vh] mx-auto">
            <video
              controls
              className="w-full h-full rounded-xl media-player"
              onLoadedData={() => {
                setLoading(false)
                toast.success('Video loaded successfully')
              }}
              onError={() => {
                setError('Failed to load video')
                setLoading(false)
                toast.error('Failed to load video preview')
              }}
            >
              <source src={file.url} type={file.type} />
              Your browser does not support the video tag.
            </video>
          </div>
        )

      case 'audio':
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <ApperIcon name="Music" className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
              {file.name}
            </h3>
            <audio
              controls
              className="w-full mb-4 media-player"
              onLoadedData={() => {
                setLoading(false)
                toast.success('Audio loaded successfully')
              }}
              onError={() => {
                setError('Failed to load audio')
                setLoading(false)
                toast.error('Failed to load audio preview')
              }}
            >
              <source src={file.url} type={file.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )

      case 'pdf':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="pdf-viewer">
              <Document
                file={file.url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="preview-loading">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-surface-600 dark:text-surface-400">Loading PDF...</span>
                  </div>
                }
              >
                <Page 
                  pageNumber={pageNumber} 
                  className="pdf-page"
                  width={Math.min(800, window.innerWidth - 100)}
                />
              </Document>
              
              {numPages && numPages > 1 && (
                <div className="pdf-navigation mt-4">
                  <button
                    onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber <= 1}
                    className="p-2 bg-surface-100 dark:bg-surface-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                    disabled={pageNumber >= numPages}
                    className="p-2 bg-surface-100 dark:bg-surface-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    <ApperIcon name="ChevronRight" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case 'document':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="document-viewer">
              {documentContent ? (
                <div dangerouslySetInnerHTML={{ __html: documentContent }} />
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="FileText" className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-surface-600 dark:text-surface-400">Document preview not available</p>
                  <button 
                    onClick={() => downloadFile(file)}
                    className="mt-4 btn-primary inline-flex items-center gap-2"
                  >
                    <ApperIcon name="Download" className="w-4 h-4" />
                    Download to View
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case 'code':
      case 'text':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="code-viewer">
              {textContent ? (
                <SyntaxHighlighter
                  language={getLanguageFromExtension(file.name)}
                  style={oneDark}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    margin: 0,
                    maxHeight: '70vh',
                    fontSize: '14px'
                  }}
                >
                  {textContent}
                </SyntaxHighlighter>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Code" className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-surface-600 dark:text-surface-400">Text content preview not available</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <ApperIcon name={getFileIcon(file.type)} className={`w-16 h-16 ${getFileColor(file.type)}`} />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
              {file.name}
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              {canPreviewFile(file.type, file.name) 
                ? 'Preview is loading...' 
                : 'This file type cannot be previewed in the browser.'}
            </p>
            <div className="preview-metadata">
              <div className="metadata-item">
                <div className="metadata-label">File Size</div>
                <div className="metadata-value">{formatFileSize(file.size)}</div>
              </div>
              <div className="metadata-item">
                <div className="metadata-label">File Type</div>
                <div className="metadata-value">{file.type}</div>
              </div>
              <div className="metadata-item">
                <div className="metadata-label">Upload Date</div>
                <div className="metadata-value">{format(file.uploadDate, 'MMM dd, yyyy')}</div>
              </div>
            </div>
            <button 
              onClick={() => downloadFile(file)}
              className="mt-6 btn-primary inline-flex items-center gap-2"
            >
              <ApperIcon name="Download" className="w-4 h-4" />
              Download File
            </button>
          </div>
        )
    }
  }

  // Download file function
  const downloadFile = async (file) => {
    try {
      const response = await fetch(file.url)
      const blob = await response.blob()
      saveAs(blob, file.name)
      toast.success(`${file.name} downloaded successfully`)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download file')
    }
  }


  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // Load content based on file type
  useEffect(() => {
    setLoading(true)
    setError(null)
    setDocumentContent('')
    setTextContent('')
    setPageNumber(1)
    setNumPages(null)
    
    if (isDocumentFile(file.type, file.name)) {
      loadDocumentContent()
    } else if (isCodeFile(file.type, file.name) || isTextFile(file.type, file.name)) {
      loadTextContent()
    } else if (!isImageFile(file.type) && !isVideoFile(file.type) && !isAudioFile(file.type) && !isPDFFile(file.type)) {
      // For other file types, stop loading after a brief delay
      setTimeout(() => setLoading(false), 500)
    }
    // For images, videos, audio, and PDFs, loading is handled by their respective components
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
              <div className="preview-loading">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-surface-600 dark:text-surface-400">Loading preview...</span>
              </div>
            )}
            
            {!loading && renderPreview()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FilePreview