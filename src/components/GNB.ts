import {Component} from '../core/core';
import aboutStore from '../store/about';


interface State {
  [key:string]: unknown
  menus:{
    name: string
    href: string
  }[]
}

export default class GNB extends Component {
  // 비정상동작 할 것.
  // 부모에서 할당하고 render() 호출을 바로 함. 1번은 정상동작.
  // 'popstate'에서 render가 호출되면 GNB에서 선언한 state를 사용하므로 초기화 된 빈 값을 사용한다.
  // public state = {} as State
  
  // 부모의 state를 쓰기 위해서 우리는 초기화 하고 싶지 않은 경우
  // !를 사용하여 초기화 했다고 단언한다. ( 할당 단언 )
  // public state!:State
  constructor(public state: State = {
    menus: [
      {name: 'Search', href: '#/'},
      {name: 'Movie', href: '#/movie?id=tt4520988'},
      {name: 'About', href: '#/about'},
    ]
  }) {
    super({
      tagName:"header",
      state: state
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
