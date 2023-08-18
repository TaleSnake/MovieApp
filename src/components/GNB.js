import {Component} from '../core/core';
import aboutStore from '../store/about';

export default class GNB extends Component {
  constructor() {
    super({
      tagName:"header",
      state: {
        menus: [
          {name: 'Search', href: '#/'},
          {name: 'Movie', href: '#/movie?id=tt4520988'},
          {name: 'About', href: '#/about'},
        ]
      }
    })
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  
  render() {
    const { photo } = aboutStore.state
    
    this.el.classList.add('gnb')
    this.el.innerHTML = `
      <div class="gnb-container">
        <a class="logo" href="/#/" ><span>OMDbAPI</span>.COM</a>
        <nav class="menu">
         <ul>
            ${this.state.menus.map(menu => {
              const href = menu.href.split('?')[0]
              const hash = location.hash.split('?')[0]
              const isActive = href === hash
              return `<li><a class="${isActive ? 'active' : ''}" href="${menu.href}">${menu.name}</a></li>`}).join('')}
         </ul>
        </nav>
        <a href="#/about" class="user">
         <img src="${photo}" alt="User">
        </a>
      </div>
    `
    
    
  }
}
