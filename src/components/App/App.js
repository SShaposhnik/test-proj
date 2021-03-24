import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import { Layout, Tag, Icon } from 'antd'

import { NavMenu } from 'components'
import { ROUTES, MENU } from 'routes'
import { findUser } from 'utils'

import 'antd/dist/antd.css'
import './App.less'

//STORE
import { observer } from 'mobx-react'
import { authStore, layoutStore } from 'storages'

const { Content } = Layout

const App = props => {
  const {
    history
  } = props

  const { getUserInfo } = layoutStore
  const { isAuth } = authStore

  useEffect(() => {
    setUser()
  }, [])

  const setUser = () => {
    const userData = findUser()

    if (!userData) {
      return false
    }

    layoutStore.setUser(userData.id, userData.name)
  }

  const logout = () => {
    authStore.logout()
    history.push('/auth')
  }

  if (!isAuth) {
    return <Redirect to='/auth'/>
  }

  return (
    <Layout>
      <NavMenu
        logout={logout}
        items={MENU}
      />
      <Content>
        <div className='site-layout-content'>
          <Switch>
            {
              ROUTES.map((route, index) => (
                <Route
                  key={index}
                  exact
                  { ...route }
                />
              ))
            }

            <Redirect to={ROUTES[0].path} />
          </Switch>
        </div>
      </Content>
    </Layout>
  )
}

export default observer(withRouter(App))
