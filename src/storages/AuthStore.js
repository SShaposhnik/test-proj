import {
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  action,
  configure
} from 'mobx'

import localStorage, { STORAGE_KEYS } from 'utils/localStorage'
import { layoutStore } from 'storages'

configure({ enforceActions: 'observed' })

const { AUTH } = STORAGE_KEYS
const token = localStorage.get(AUTH)?.token

class AuthStore {
  isAuth = !!token
  token = token

  constructor() {
    // makeAutoObservable(this)
    makeObservable(this, {
      token: observable,
      isAuth: observable,

      loginSuccess: action,
      logout: action
    })

    this.isAuth = this.isAuth
    this.token = this.token
  }


  /**
   * Успешная авторизация, установка токена в localStorage
   * @param token {string}
   */
  loginSuccess (token, user) {
    localStorage.set(AUTH, {
      token
    })
    layoutStore.setUser(user.id, user.name)

    this.token = token
    this.isAuth = !!token
  }

  /**
   * Выход из профиля
   */
  logout () {
    localStorage.set(AUTH, {
      token: null
    })

    this.token = null
    this.isAuth = false
  }

}

export { AuthStore }
export default new AuthStore()
