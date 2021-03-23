import React from 'react'
import { Menu } from 'antd';
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'

const NavMenu = props => {
  const {
    items,
    logout
  } = props

  const renderMenu = () => {
    return (
      items.map((menuBtn, index) => (
        <Menu.Item key={index}>
          <span className='nav-text'>{menuBtn.name}</span>
          <Link to={menuBtn.to}/>
        </Menu.Item>
      ))
    )
  }

  return (
    <Menu
      theme='dark'
      mode="horizontal"
      defaultSelectedKeys={['1']}
    >
      {/* <div> */}
        {renderMenu()}
        <Menu.Item key={items.length} onClick={logout}>
          <span className='nav-text'>Выход</span>
        </Menu.Item>
      {/* </div> */}
    </Menu>
  )
}

export default NavMenu