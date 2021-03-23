import {
  makeObservable,
  observable,
  computed,
  action,
  toJS,
  configure
} from 'mobx'

configure({ enforceActions: 'observed' })

class LayoutStore {
  user = {
    id: null,
    name: null
  }

  constructor() {
    // makeAutoObservable(this)
    makeObservable(this, {
      user: observable,
      setUser: action,
      userInfo: computed
    })

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