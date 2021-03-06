import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import sibdevLogo from 'assets/sibdevLogo.png'

import './NavMenu.less'

const NavMenu = props => {
  const {
    items,
    logout,
    pathName
  } = props

  const [selectedKeys, setSelectedKeys] = useState('0')

  const renderMenu = () => (
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

  useEffect(() => {
    items.forEach((route, index) => {
      if (route.to === pathName) {
        setSelectedKeys(`${index}`)
      }
    })
  }, [pathName])

  return (
    <Menu
      className='nav-menu'
      theme='light'
      mode='horizontal'
      selectedKeys={selectedKeys}
    >
      <div className='nav-menu__logo'>
        <img
          src={sibdevLogo}
          alt='логотип'
        />
      </div>
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