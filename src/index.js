import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Auth } from 'containers'
import { App } from 'components'

const rootElement = document.getElementById('root')

const MainComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path={'/auth'}
        component={Auth}
        exact
      />
      <Route
        path={'/'} render={
        (props) => (
          <App
            {...props}
          />
        )}
      />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<MainComponent />, rootElement)