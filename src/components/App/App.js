import React, { useEffect } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Tag } from 'antd'

import './App.less'

import { ROUTES, MENU } from 'routes'

import { localStorage, STATE_KEY, STORAGE_KEYS } from 'utils'

import 'antd/dist/antd.css'

//STORE
import { observer } from 'mobx-react'
import { layoutStore, authStore } from 'storages'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const {
  AUTH
} = STORAGE_KEYS

const App = props => {
  const {
    children,
    history
  } = props
  const { isAuth } = authStore

  const logout = () => {
    authStore.logout()
    history.push('/auth')
  }

  if (!isAuth) {
    return <Redirect to='/auth'/>
  }

  return (
    <Layout>
      <Layout>
        <Content>
          <div className='layout-content-inner'>{children}</div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ультрафреш</Footer>
      </Layout>
    </Layout>
  )
}

export default observer(withRouter(App))
