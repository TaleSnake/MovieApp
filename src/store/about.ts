import {Store} from '../core/core';


interface State {
  photo: string,
  name: string,
  email: string,
  blog: string,
  github: string,
  repository: string
}
export default new Store<State>({
  photo: "https://raw.githubusercontent.com/TaleSnake/remove-MovieApp/master/src/assets/logo.png",
  name: 'Tale.Snake / Choi HyeonHee',
  email: "tale.snake@gamil.com",
  blog: "https://blog.snake.com/",
  github: "https://github.com/TaleSnake",
  repository: "https://github.com/TaleSnake",
})
