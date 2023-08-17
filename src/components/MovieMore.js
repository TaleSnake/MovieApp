import { Component } from '../core/core'
import movieStore, { searchMovies } from '../store/movie'

export default class MovieMore extends Component {
	constructor () {
		super({
			tagName: 'button'
		})
		movieStore.subscribe('hasNext', () => {
			this.render()
		})
	}
	render () {
		this.el.classList.add('btn', 'view-more', 'hide')
		this.el.textContent = 'View more..'
		this.el.addEventListener('click', async () => {
			await searchMovies(movieStore.state.page + 1)
		})
		
		movieStore.state.hasNext
				? this.el.classList.remove('hide')
				: this.el.classList.add('hide')
	}
	
}
