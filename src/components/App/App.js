import React, { useEffect } from 'react'

import './App.less'

//STORE
import { observer } from 'mobx-react'
import layoutStore from 'store/LayoutStore'

const App = () => {
  const { userInfo } = layoutStore

  useEffect(() => {
    layoutStore.setUser(1, 'Sergey')
  }, [])

  return (
    <div className="App">
      {userInfo.name}
    </div>
  )
}

export default observer(App)
