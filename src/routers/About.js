import { Component } from '../core/core'
import aboutStore from '../store/about';

export default class About extends Component {
	constructor () {
		super()
	}
	
	render () {
		
		const { photo, name,  email, github, blog  } = aboutStore.state
		
		this.el.classList.add('container', 'about')
		this.el.innerHTML = `
			<div class="photo"
						style="background-image: url(${photo})">
			</div>
			<p class="name">${name}</p>
			<p><a href="https://mail.google.com/mail/?view=cm&fs=1&to${email}"
						target="_blank">${email}</a>
			</p>
			<p><a href="${github}">Github</a></p>
		`
	}
}
