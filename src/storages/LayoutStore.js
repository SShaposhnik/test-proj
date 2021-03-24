import {
  makeObservable,
  makeAutoObservable,
  observable,
  computed,
  action,
  toJS,
  configure
} from 'mobx'

import { STORAGE_KEYS, localStorage, findUser } from 'utils'

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

      savedUserResults: computed
    })
  }

  /**
   * Update seach item in local storage
   * @param state {object}
   */
  updateSearchItems(state) {
    const { itemId } = state
    const index = this.savedResult.findIndex(item => item.itemId === itemId)

    this.savedResult[index] = state

    localStorage.set(SAVED_RESULTS, this.savedResult)
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
   * Load saved relust in local storage
   */
  get savedUserResults() {
    const userId = this.user.id

    return toJS(this.savedResult.filter(item => item.userId === userId))
  }

  /**
   * Save search in local storage
   * @param state {object}
   */
   saveSearchItem(state) {
    let saved = this.savedResult

    const newList = [
      ...saved,
      {
        ...state,
        itemId: this.savedResult.length + 1,
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