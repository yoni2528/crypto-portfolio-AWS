export let BASE_URL: string

if (import.meta.env.MODE === 'development') {
  BASE_URL = import.meta.env.VITE_DEVELOPMENT_URL
} else {
  BASE_URL = import.meta.env.VITE_PRODUCTION_URL
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
