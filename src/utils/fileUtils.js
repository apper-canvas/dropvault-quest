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
  if (type.startsWith('image/')) return 'text-green-500'
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

export const isTextFile = (type, name) => {
  return type.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.md')
}
