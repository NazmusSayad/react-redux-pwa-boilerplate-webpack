import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import store from './store'
import App from './App'

navigator?.serviceWorker?.register('/sw.js').catch(() => {})

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
