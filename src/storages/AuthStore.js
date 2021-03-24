import {
  makeObservable,
  observable,
  action,
  configure
} from 'mobx'

import localStorage, { STORAGE_KEYS } from 'utils/localStorage'

configure({ enforceActions: 'observed' })

const { AUTH } = STORAGE_KEYS
const token = localStorage.get(AUTH)?.token

class AuthStore {
  isAuth = !!token
  token = token

  constructor() {
    makeObservable(this, {
      token: observable,
      isAuth: observable,

      loginSuccess: action,
      logout: action
    })
  }


  /**
   * Успешная авторизация, установка токена в localStorage
   * @param token {string}
   */
  loginSuccess (token) {
    localStorage.set(AUTH, {
      token
    })

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
