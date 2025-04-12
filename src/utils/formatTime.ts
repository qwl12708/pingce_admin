import dayjs from 'dayjs'

export const formatTime = (timestamp: number | string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  try {
    if (!timestamp) return '-'

    const time = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
    const milliseconds = String(time).length === 10 ? time * 1000 : time

    if (isNaN(milliseconds)) {
      return '-'
    }

    return dayjs(milliseconds).format(format)
  } catch (error) {
    console.error('时间格式化错误:', error)
    return '-'
  }
}
