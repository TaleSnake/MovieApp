import { Component } from '../core/core'

export default class MovieItem extends Component {
	constructor (props) {
		super({
			props,
			tagName: 'a'
		})
	}

	render () {
		const { movie } = this.props

		this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
		this.el.classList.add('movie')
		this.el.style.backgroundImage = `url(${movie.Poster})`
		this.el.style.backgroundRepeat = 'no-repeat'
		this.el.innerHTML = `
			<div class="info">
					<div class="year">${movie.Year}</div>
				<div class="title">${movie.Title}</div>
			</div>
		`

	}
}
