import { Component } from '../core/core'
import movieStore, { searchMovies } from '../store/movie'
import movie from '../store/movie'

export default class Search extends Component {
	constructor (props) {
		super(props)
	}
	
	render () {
		this.el.classList.add('search')
		this.el.innerHTML = `
			<input
				value="${movieStore.state.searchText}"
				placeholder="Enter the movie title to search!"/>
			<button class="btn btn--primary">
				Search!
			</button>
		`
		const inputEl = this.el.querySelector('input')
		inputEl.addEventListener('input', event => {
			movieStore.state.searchText = inputEl.value
		})
		inputEl.addEventListener('keydown', event => {
			if(event.key === 'Enter' && movieStore.state.searchText.trim()) {
				// 검색 호출
				searchMovies(1)
			}
		})
		const btnEl = this.el.querySelector('button')
		btnEl.addEventListener('click', event => {
			// 검색 호출
			if( movieStore.state.searchText.trim() ) {
				searchMovies(1)
			}
		})
	}
}
