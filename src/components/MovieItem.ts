import { GenericComponent } from '../core/core'
import { Search } from "../store/movie";

interface Props {
	[key:string]: unknown,
	movie: Search
}
export default class MovieItem extends GenericComponent<Object, Props> {
	constructor (public props: Props) {
		super({
			tagName :'a',
			props
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
