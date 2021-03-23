import axios from 'axios'

export default class HttpClient {
  static YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'
  // static BASE_URL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3001/api/v1'
  // static IMG_URL = process.env.NODE_ENV === 'production' ? '/app/uploads/' : 'https://samonadom.ru/app/uploads/'
  // static ABSOLUTE_IMG_URL = 'https://samonadom.ru/app/uploads/'
  // static ABSOLUTE_URL = 'https://samonadom.ru/app/'

  static get (url, config) {
    const _source = axios.CancelToken.source()
    return {
      promise: axios.get(url, { ...config }, { cancelToken: _source.token }),
      cancel: () => _source.cancel()
    }
  }

  static post (url, config) {
    const _source = axios.CancelToken.source()
    return {
      promise: axios.post(url, { ...config }, { cancelToken: _source.token }),
      cancel: () => _source.cancel()
    }
  }

  static delete (url, config) {
    const _source = axios.CancelToken.source()
    return {
      promise: axios.delete(url, { ...config }, { cancelToken: _source.token }),
      cancel: () => _source.cancel()
    }
  }

  static put (url, config) {
    const _source = axios.CancelToken.source()
    return {
      promise: axios.put(url, { ...config },{ cancelToken: _source.token }),
      cancel: () => _source.cancel()
    }
  }
}
