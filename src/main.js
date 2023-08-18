import App from './App'
import routers from './routers'

const rootEl = document.querySelector('#root')
rootEl.append(new App().el)
routers()
