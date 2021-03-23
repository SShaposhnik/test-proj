import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import './NavMenu.less'

const NavMenu = props => {
  const {
    items,
    logout
  } = props

  const renderMenu = () => {
    return (
      items.map((menuBtn, index) => (
        <Menu.Item key={index}>
          <Link to={menuBtn.to}>
            <span className='nav-menu__btn-text'>
              {menuBtn.name}
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
      mode="horizontal"
      defaultSelectedKeys={['0']}
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