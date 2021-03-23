import React, { useEffect } from 'react'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import { Layout, Tag, Icon } from 'antd'

import { NavMenu } from 'components'
import { ROUTES, MENU } from 'routes'

import 'antd/dist/antd.css'
import './App.less'
//STORE
import { observer } from 'mobx-react'
import { layoutStore, authStore } from 'storages'

const { Content, Footer, Header } = Layout

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
      <NavMenu
        logout={logout}
        items={MENU}
      />
      <Content>
        <div className='layout-content-inner'>
          <Switch>
            {
              ROUTES.map((route, i) => (
                <Route
                  key={i}
                  exact
                  { ...route }
                />
              ))
            }

            <Redirect to={ROUTES[0].path} />
          </Switch>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>Ультрафреш</Footer>
    </Layout>
  )
}

export default observer(withRouter(App))
