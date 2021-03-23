import React, { useEffect } from 'react'

import './App.less'

//STORE
import { observer } from 'mobx-react'
import { layoutStore } from 'storages'

const App = () => {
  const { userInfo } = layoutStore

  const setUserFunc = () => {
    layoutStore.setUser(1, 'Sergey')
  }

  return (
    <div className="App">
      {userInfo.name}

    <button onClick={setUserFunc}>
      use
    </button>
    </div>
  )
}

export default observer(App)
