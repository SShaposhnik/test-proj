// import {
//   Home,
//   Favorites
// } from 'containers'

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
    path: '/favorites',
    component: Favorites
  },
  {
    path: '/home',
    component: Home
  },
]

export {
  MENU,
  ROUTES
}