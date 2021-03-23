import React from 'react'

import {
  Auth,
  Home
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
    to: '/auth',
  },
]

const ROUTES = [
  {
    path: '/home',
    component: Home
  },
]

export {
  MENU,
  ROUTES
}