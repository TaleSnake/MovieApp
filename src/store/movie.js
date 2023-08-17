import { Store } from '../core/core'

const store = new Store({
	searchText: '',
	page: 1,
	pageMax: 1,
	movies: [],
	movie: {},
	hasNext: false,
	loading: false,
	message: 'Search for the movie title!'
})
export default store

const KEY = '7035c60c'
const URL = `https://omdbapi.com/?apikey=${KEY}`

export const searchMovies = async page => {
	store.state.loading = true
	store.state.page = page
	store.state.message = ''
	if(page === 1) {
		store.state.movies = []
		store.state.pageMax = 1
		store.state.hasNext = false
	}
	
	try {
		const res = await fetch(URL+`&s=${store.state.searchText}&page=${page}`)
		const json = await res.json()
		console.log(json)
		const { Search, totalResults, Response, Error } = json
		
		if(Response === 'True') {
			store.state.movies = [...store.state.movies, ...Search]
			store.state.pageMax = Math.ceil(Number(totalResults) / 10)
			store.state.hasNext = store.state.page < store.state.pageMax
		}else {
			store.state.message = Error
			store.state.pageMax = 1
			store.state.hasNext = false
		}
		
	}catch (error) {
		console.log('searchMoves error:', error)
		
	}finally {
		store.state.loading = false
		
	}
}

export const getMovieInfo = async id => {
	try {
		const res = await fetch(URL+`&i=${id}&plot=full`)
		const json = await res.json()
		store.state.movie = json
		console.log(json)
		
	}catch (error) {
		console.log('getMovieInfo error:', error)
		
	}finally {
	
	}
}


