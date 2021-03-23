import {
  configure,
  toJS,
  makeAutoObservable
} from 'mobx'

configure({ enforceActions: 'observed' })

class LayoutStore {
  constructor() {
    makeAutoObservable(this)

    this.user = {
      id: null,
      name: null
    }
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
}

export { LayoutStore }
export default new LayoutStore()