import Home from './containers/Home/Home'
import Favorites from './containers/Favorites/Favorites'

const MENU = [
  {
    name: 'Поиск',
    to: '/home',
  },
  {
    name: 'Избранное',
    to: '/favorites',
  },
]

const ROUTES = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/favorites',
    component: Favorites
  },
]

export {
  MENU,
  ROUTES
}