import {
  makeObservable,
  makeAutoObservable,
  observable,
  computed,
  action,
  toJS,
  configure
} from 'mobx'

import { STORAGE_KEYS, localStorage } from 'utils'

configure({ enforceActions: 'observed' })

const {
  SAVED_RESULTS
} = STORAGE_KEYS
class LayoutStore {
  user = {
    id: null,
    name: null,
  }
  savedResult = []
  isOpenFavoriteModal = false

  constructor() {
    makeObservable(this, {
      user: observable,
      savedResult: observable,
      isOpenFavoriteModal: observable,

      setUser: action,
      saveSearch: action,

      loadSavedResult: computed,
      userInfo: computed
    })

    // this.user = this.user
    // this.savedResult = this.loadSavedResult
    // this.isOpenFavoriteModal = this.isOpenFavoriteModal
  }

  /**
   * Open/Close favorite modal
   * @param value {boolean}
   */
  toggleIsOpenFavoriteModal(value) {
    this.isOpenFavoriteModal = value
  }

  /**
   * Set user name
   * @param id
   * @param name
   */
  setUser(id, name) {
    this.user = {
      id: id,
      name: name
    }
  }

  get userInfo() {
    return toJS(this.user)
  }

  /**
   * Load saved relust in local storage
   */
  get loadSavedResult() {
    return localStorage.get(SAVED_RESULTS) || []
  }

  /**
   * Save search in local storage
   * @param state {object}
   */
   saveSearch(state) {
    let saved = this.loadSavedResult

    localStorage.set(SAVED_RESULTS, [
      ...saved,
      state
    ])
  }
}

export { LayoutStore }
export default new LayoutStore()