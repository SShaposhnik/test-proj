import { render, hydrate } from 'react-dom'

import { App } from 'components'

const rootElement = document.getElementById('root')

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}
