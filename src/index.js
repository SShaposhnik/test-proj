import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Auth } from 'containers'
import { App } from 'components'

const rootElement = document.getElementById('root')

const MainComponent = () => {
  const [ userProfile, setUserProfile ] = useState(null)

  return (
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
              profile={userProfile}
              onProfileLoaded={(profile) => setUserProfile(profile)}
              {...props}/>
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<MainComponent />, rootElement)