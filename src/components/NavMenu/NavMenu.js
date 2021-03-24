import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import './NavMenu.less'

const NavMenu = props => {
  const {
    items,
    logout,
  } = props

  const renderMenu = () => {
    return (
      items.map((route, index) => (
        <Menu.Item key={index}>
          <Link to={route.to}>
            <span className='nav-menu__btn-text'>
              {route.name}
            </span>
          </Link>
        </Menu.Item>
      ))
    )
  }

  return (
    <Menu
      className='nav-menu'
      theme='light'
      mode='horizontal'
      defaultSelectedKeys='0'
    >
      {renderMenu()}
      <Menu.Item key={items.length} onClick={logout}>
        <span className='nav-menu__btn-text'>
          Выход
        </span>
      </Menu.Item>
    </Menu>
  )
}

export default NavMenu