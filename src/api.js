import axios from 'axios'
import { store } from '@/store/store';

const baseURLs = {
  production: 'https://health-action-tracker.herokuapp.com/api/v1',
  development: '/api/v1',
}

console.log(store)

const api = axios.create({
  baseURL: baseURLs[process.env.NODE_ENV],
  headers: {
    Authorization: `Bearer ${store.state.auth.access_token}`,
  }
})

export default api;