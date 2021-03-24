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

const { SAVED_RESULTS } = STORAGE_KEYS
class LayoutStore {
  user = {
    id: null,
    name: null,
  }
  savedResult = localStorage.get(SAVED_RESULTS) || []
  isOpenFavoriteModal = false
  saveState = null

  constructor() {
    makeObservable(this, {
      user: observable,
      savedResult: observable,
      isOpenFavoriteModal: observable,
      saveState: observable,

      setUser: action,
      saveSearchItem: action,
      removeSearchItem: action,
      setSearchState: action,
      updateSearchItems: action,

      getSavedResult: computed,
      getUserInfo: computed,
      getSaveState: computed
    })
  }

  /**
   * Update seach item in local storage
   * @param state {object}
   */
  updateSearchItems(state) {
    const { index } = state

    this.savedResult[index] = state

    localStorage.set(SAVED_RESULTS, this.savedResult)
  }

  /**
   * Load save state for the search
   */
  get getSaveState() {
    return toJS(this.saveState)
  }

  /**
   * Save on search state for search on home
   * @param state {object}
   */
  setSearchState(state) {
    this.saveState = state
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

  /**
   * Load user info
   */
  get getUserInfo() {
    return toJS(this.user)
  }

  /**
   * Load saved relust in local storage
   */
  get getSavedResult() {
    const { id } = this.user

    const findUserState = localStorage.get(SAVED_RESULTS).find(
      state => state.userId === id)

    return toJS(this.savedResult)
  }

  /**
   * Save search in local storage
   * @param state {object}
   */
   saveSearchItem(state) {
    let saved = this.getSavedResult

    const newList = [
      ...saved,
      {
        ...state,
        userId: this.user.id
      }
    ]

    this.savedResult = newList
    localStorage.set(SAVED_RESULTS, newList)
  }

  /**
   * Delete search item from local storage
   * @param index {number}
   */
  removeSearchItem(index) {
    this.savedResult =  this.savedResult.filter((item, itemIndex) => itemIndex !== index)

    localStorage.set(SAVED_RESULTS, this.savedResult)
  }
}

export { LayoutStore }
export default new LayoutStore()