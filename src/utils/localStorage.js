const STATE_KEY = 'test_proj_state'

const STORAGE_KEYS = {
  AUTH: 'auth',
  SAVED_RESULTS: 'savedResults'
}

class LocalStorage {
  constructor () {
    this._STATE_KEY = STATE_KEY
  }

  /**
   * Выгрузить значение по ключу STATE_KEY
   * @private
   */
  _load () {
    try {
      const serializedState = localStorage.getItem(this._STATE_KEY)
      if (serializedState === null) {
        return undefined
      }
      return JSON.parse(serializedState)
    } catch (err) {
      return undefined
    }
  }

  /**
   * Выгрузить значение по ключу STATE_KEY
   * @private
   * @param state {Object} - новое значение в localStorage
   * @return {Boolean}
   */
  _save (state) {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(STATE_KEY, serializedState)

      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Получить значение из LocalStorage по ключу
   * @param key {String} - ключ значения
   */
  get (key) {
    const store = this._load()
    if (store)
      return store[key]

    return undefined
  }

  /**
   * Загрузить значение в localStorage по ключу
   * @param key {String} - ключ значения
   * @param value {*} - Значение
   */
  set (key, value) {
    const store = this._load()
    this._save({
      ...store,
      [key]: value
    })

    return true
  }

  /**
   * Удалить значение по ключу
   * @param key {String} - ключ значения
   */
  remove (key) {
    const store = this._load()

    const founded = key in store
    if (founded) {
      delete store[key]

      this._save({
        ...store
      })
      return true
    }

    return false
  }

  /**
   * Получить значения из localStorage
   */
  get store () {
    return this._load()
  }

  /**
   * получить только ключи из localStorage
   */
  get keys () {
    const store = this._load()
    return Object.keys(store)
  }

  /**
   * Проверить есть ли значене по ключу
   * @param key {String} - ключ значения
   */
  has (key) {
    console.log(key);
    const store = this._load()

    if (store) {
      return key in store
    }

    return false
  }
}

export { STORAGE_KEYS }
export default new LocalStorage()