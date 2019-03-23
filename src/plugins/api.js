import axios from 'axios'

const baseURLs = {
  production: 'https://health-action-tracker.herokuapp.com/api/v1',
  development: '/api/v1',
}

export const api = axios.create({
  baseURL: baseURLs[process.env.NODE_ENV],
})
