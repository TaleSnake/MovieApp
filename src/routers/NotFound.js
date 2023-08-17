import {Component} from '../core/core';

export default class NotFound extends Component {
  render() {
    this.el.classList.add('container', "not-found")
    this.el.innerHTML = `
    <div>Sorry..<br />Page Not Found.</div>
`
  }
}
