import {Component} from '../core/core';
import aboutStore from '../store/about';

export default class Footer extends Component {
  constructor() {
    super({
      tagName: 'footer'
    });
  }
  render() {
    const thisYear = new Date().getFullYear()
    const { github, repository } = aboutStore.state
    this.el.innerHTML = `
        <div class="footer-container">
            <div><a href="">Github Repository</a></div>
            <div><a href="${repository}">${thisYear} Tale.Snake</a></div>
        </div>
    `
  }
}
