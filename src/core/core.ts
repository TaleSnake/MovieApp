///// Component /////
import NotFound from "../routers/NotFound";

interface Payload<S, P> {
	tagName?: string,
	props?: S,
	state?: P
}
interface BasePayload {
	tagName?: string,
	props?: {},
	state?: {}
}

export class GenericComponent<S, P> {
	public el
	public props? : S
	public state? : P
	constructor(public payload?: Payload<S, P>) {
		let tagName = 'div'
		if(payload) {
			tagName = payload.tagName ? payload.tagName : 'div'
			this.props = payload.props // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
			this.state = payload.state // 컴포넌트 안에서 사용할 데이터
		}
		this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
		this.render()
	}
	// 컴포넌트를 렌더링하는 함수
	render() {}
}
export class Component {
	public el
	public props?= {}
	public state? = {}
	constructor(public payload?: BasePayload) {
		let tagName = 'div'
		if(payload) {
			tagName = payload.tagName ? payload.tagName : 'div'
			this.props = payload.props // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
			this.state = payload.state // 컴포넌트 안에서 사용할 데이터
		}
		this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
		this.render()
	}
	// 컴포넌트를 렌더링하는 함수
	render() {}
}


///// Router /////
// 페이지 렌더링!

interface Route {
	path: string,
	component: Component
}

function routeRender(routes: Route[]) {
	// 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
	if (!location.hash) {
		history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
	}
	const routerView = document.querySelector('router-view')
	const [hash, queryString = ''] = location.hash.split('?') // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분
	
	// 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
	const query = queryString
		 .split('&')
		 .reduce((acc :{[key:string]:string}, cur) => {
			 const [key, value] = cur.split('=')
			 acc[key] = value
			 return acc
		 }, {})
	history.replaceState(query, '') // (상태, 제목)
	
	// 2) 현재 라우트 정보를 찾아서 렌더링!
	const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
	if(routerView) {
		routerView.innerHTML = ''
		// @ts-ignore
		currentRoute && routerView.append(new currentRoute.component().el)
	}
	// 3) 화면 출력 후 스크롤 위치 복구!
	window.scrollTo(0, 0)
}

export function checkType<T>(val: any) {
	let T;
	return Object.prototype.toString.call(val).slice(8, -1) === typeof T
}

export function createRouter(routes: Route[]) {
	// 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
	return function () {
		window.addEventListener('popstate', () => {
			routeRender(routes)
		})
		routeRender(routes)
	}
}


///// Store /////

interface Observer {
	[key:string]: SubscribeCallback[]
}
interface SubscribeCallback {
	(arg: unknown): void
}
export class Store<S> {
	public state = {} as S
	public observers = {} as Observer
	constructor(state:S) {
		for (const key in state) {
			// 각 상태에 대한 변경 감시(Setter) 설정!
			Object.defineProperty(this.state, key, {
				// Getter
				get: () => state[key],
				// Setter
				set: val => {
					state[key] = val
					if (Array.isArray(this.observers[key])) { // 호출할 콜백이 있는 경우!
						this.observers[key].forEach(observer => observer(val))
					}
				}
			})
		}
	}
	// 상태 변경 구독!
	subscribe(key:string, cb: SubscribeCallback) {
		Array.isArray(this.observers[key]) // 이미 등록된 콜백이 있는지 확인!
			 ? this.observers[key].push(cb) // 있으면 새로운 콜백 밀어넣기!
			 : this.observers[key] = [cb] // 없으면 콜백 배열로 할당!
		
		// 예시)
		// observers = {
		//   구독할상태이름: [실행할콜백1, 실행할콜백2]
		//   movies: [cb, cb, cb],
		//   message: [cb]
		// }
	}
}
