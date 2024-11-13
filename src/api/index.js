import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_SPOONACULAR_API_BASE_URL || 'https://api.spoonacular.com',
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading state here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error

    // Handle different error cases
    if (response?.status === 401) {
      // Handle unauthorized
    } else if (response?.status === 403) {
      // Handle forbidden
    } else if (response?.status === 429) {
      // Handle rate limit
    }

    // Generic error message
    const errorMessage = response?.data?.message || 'An error occurred'
    console.error('API Error:', errorMessage)

    return Promise.reject(error)
  }
)

export default api