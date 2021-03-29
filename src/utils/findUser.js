import localStorage, { STORAGE_KEYS } from './localStorage'
import authData from '../authData.json'

const { AUTH } = STORAGE_KEYS

const token = localStorage.get(AUTH)?.token

export const findUser = () => {
  const userId = token?.replace('userId', '')

  if (!userId) {
    return null
  }

  const userData = authData.users.find(user => user.id == userId)

  return userData
}