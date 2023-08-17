import { Component } from './core/core'
import GNB from './components/GNB';
import Footer from './components/Footer';

export default class App extends Component {
	render () {
		const gnb = new GNB()
		const footer = new Footer()
		const routerView = document.createElement('router-view')
		this.el.append(
				gnb.el,
				routerView,
				footer.el
		)
	}
}

