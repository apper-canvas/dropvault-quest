import { useState, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'

export const useFileManager = () => {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedFiles, setSelectedFiles] = useState(new Set())
  const [uploadProgress, setUploadProgress] = useState({})
  const [currentFolder, setCurrentFolder] = useState({ id: 'root', name: 'All Files' })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [previewFile, setPreviewFile] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef(null)

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

  const deleteFile = (fileId, fileName) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    toast.success(`${fileName} deleted successfully`)
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

  return {
    // State
    files,
    dragActive,
    viewMode,
    selectedFiles,
    uploadProgress,
    currentFolder,
    searchTerm,
    sortBy,
    previewFile,
    showPreview,
    fileInputRef,
    filteredFiles,
    
    // Setters
    setViewMode,
    setSearchTerm,
    setSortBy,
    setSelectedFiles,
    
    // Actions
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
  }
}
