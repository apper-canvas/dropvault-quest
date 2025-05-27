export const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'Image'
  if (type.startsWith('video/')) return 'Video'
  if (type.startsWith('audio/')) return 'Music'
  if (type.includes('pdf')) return 'FileText'
  if (type.includes('word') || type.includes('document')) return 'FileText'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'BarChart3'
  if (type.includes('zip') || type.includes('rar')) return 'Archive'
  return 'File'
}
export const getFileColor = (type) => {
  if (type.startsWith('image/')) return 'text-emerald-500'


  if (type.startsWith('video/')) return 'text-purple-500'
  if (type.startsWith('audio/')) return 'text-orange-500'
  if (type.includes('pdf')) return 'text-red-500'
  if (type.includes('word') || type.includes('document')) return 'text-blue-500'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'text-emerald-500'
  if (type.includes('zip') || type.includes('rar')) return 'text-yellow-600'
  return 'text-surface-500'
}



export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const isImageFile = (type) => {
  return type.startsWith('image/')
}

export const isVideoFile = (type) => {
  return type.startsWith('video/')
}

export const isAudioFile = (type) => {
  return type.startsWith('audio/')
}

export const isPDFFile = (type) => {
  return type.includes('pdf')
}

export const isDocumentFile = (type, name) => {
  return type.includes('word') || type.includes('document') || 
         name.endsWith('.doc') || name.endsWith('.docx')
}

export const isCodeFile = (type, name) => {
  const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.xml', '.py', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs', '.swift']
  return type.startsWith('application/javascript') || 
         type.startsWith('application/json') || 
         type.startsWith('text/html') || 
         type.startsWith('text/css') || 
         codeExtensions.some(ext => name.toLowerCase().endsWith(ext))
}

export const canPreviewFile = (type, name) => {
  return isImageFile(type) || 
         isVideoFile(type) || 
         isAudioFile(type) || 
         isPDFFile(type) || 
         isDocumentFile(type, name) || 
         isCodeFile(type, name) || 
         isTextFile(type, name)
}

export const getPreviewType = (type, name) => {
  if (isImageFile(type)) return 'image'
  if (isVideoFile(type)) return 'video'
  if (isAudioFile(type)) return 'audio'
  if (isPDFFile(type)) return 'pdf'
  if (isDocumentFile(type, name)) return 'document'
  if (isCodeFile(type, name)) return 'code'
  if (isTextFile(type, name)) return 'text'
  return 'unsupported'
}

export const getLanguageFromExtension = (filename) => {
  const ext = filename.toLowerCase().split('.').pop()
  const languageMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'xml': 'xml',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'txt': 'text',
    'md': 'markdown'
  }
  return languageMap[ext] || 'text'
}

export const isTextFile = (type, name) => {
  return type.startsWith('text/') || 
         name.endsWith('.txt') || 
         name.endsWith('.md') || 
         name.endsWith('.readme')
}