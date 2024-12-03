export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    formatDate,
    debounce,
    tsToDateString,
    formatTimestamp,
    getRandomTimestamp,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function getRandomTimestamp() {
    const now = Date.now()
    const tenYearsAgo = now - 3 * 365 * 24 * 60 * 60 * 1000 // milliseconds in 3 years
    const randomTimestamp =
      Math.floor(Math.random() * (now - tenYearsAgo + 1)) + tenYearsAgo
    return randomTimestamp
  }
function formatTimestamp(timestamp) {
    const now = new Date()
    const date = new Date(timestamp)
  
    // Check if the date is today
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // Check if it is in the last 24 hours
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      if (diffInMinutes < 1) {
        return 'Now'
      } else if (diffInMinutes < 60) {
        const pluralS = diffInMinutes > 1 ? 's' : ''
        return `${diffInMinutes} minute${pluralS} ago`
      } else if (diffInMinutes < 60 * 24) {
        const diffInHours = Math.floor(diffInMinutes / 60)
        if (diffInHours === 1) {
          return '1 hour ago'
        } else if (diffInHours < 10) {
          return `${diffInHours} hours ago`
        }
  
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `today ${hours}:${minutes}`
      }
      return 'today'
    }
  
    // Check if it is in the same year
    if (date.getFullYear() === now.getFullYear()) {
      const month = date.toLocaleString('default', { month: 'short' })
      const day = date.getDate()
      return `${month} ${day}`
    }
  
    // If it was more than a year ago, display the year only
    const year = date.getFullYear().toString()
    return year
  }
function tsToDateString(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateString = date.toLocaleString(undefined, options);
    return dateString;
  }
  

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function formatDate(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const formattedDate = year + '-' + month + '-' + day
  
    return formattedDate
  }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
  
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }