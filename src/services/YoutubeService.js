import HttpClient from './HttpClient'

class YoutubeService extends HttpClient {
  /**
   * Get videos on youtube
   * @param text {string}
   * @param maxResult {number}
   * @param apiKey {string}
   */
  static getVideos({ text, maxResult, apiKey, filter }) {
    return this.get(`${this.YOUTUBE_API_URL}/search?part=snippet&q=${text}&type=video&maxResults=${maxResult}&order=${filter}&key=${apiKey}`).promise
  }

  static getVideoStats(id, apiKey) {
    return this.get(`${this.YOUTUBE_API_URL}/videos?part=statistics&id=${id}&key=${apiKey}`).promise
  }
}

export default YoutubeService