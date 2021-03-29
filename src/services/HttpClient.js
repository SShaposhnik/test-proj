import axios from 'axios'

export default class HttpClient {
  static get (url, config) {
    return {
      promise: axios.get(url, { ...config })
    }
  }
}
