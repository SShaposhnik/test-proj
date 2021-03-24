import axios from 'axios'

export default class HttpClient {
  static YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'

  static get (url, config) {
    const _source = axios.CancelToken.source()
    return {
      promise: axios.get(url, { ...config }, { cancelToken: _source.token }),
      cancel: () => _source.cancel()
    }
  }
}
