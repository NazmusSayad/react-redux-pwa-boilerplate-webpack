import { createRoot } from 'react-dom/client'
import App from './App'
import './index.scss'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(<App />)
