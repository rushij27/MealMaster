import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import the CSS file
import './index.css'

// Import icons if you're using them
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faBook,
  faSearch, 
  faHeart, 
  faUser, 
  faCalendar, 
  faShoppingCart,
  faClock,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faHome,
  faBook,
  faSearch, 
  faHeart, 
  faUser, 
  faCalendar, 
  faShoppingCart,
  faClock,
  faUtensils
)

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
}

// Use plugins
app.use(createPinia())
app.use(router)

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app
app.mount('#app')