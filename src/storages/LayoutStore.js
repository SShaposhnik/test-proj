import {
  makeObservable,
  makeAutoObservable,
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
    name: null,
  }

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
      userInfo: computed
    })

    this.user = this.user
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