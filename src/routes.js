import React from 'react'

import {
  Home,
  Favorites
} from 'containers'

import {
  App
} from 'components'

const MENU = [
  {
    name: 'Поиск',
    icon: 'search',
    to: '/home',
  },
  {
    name: 'Избранное',
    icon: 'favorite',
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