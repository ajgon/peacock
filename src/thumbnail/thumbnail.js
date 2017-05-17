/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }] */
import css from './thumbnail.scss'
import { h, Component } from 'preact'

class Thumbnail extends Component {
  componentDidMount() {
    let loadedClass = css.loaded

    setTimeout(() => {
      loadedClass = css['loaded-slow'] + ' ' + loadedClass
    }, 3000)

    this.base.querySelector('img').addEventListener('load', (e) => {
      e.currentTarget.className = loadedClass
    })
  }

  render () {
    const url = this.props.url

    return (
      <div className={css.thumbnail} style={{marginBottom: this.props.spacing || 0}}>
        <img src={url} width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}

export default Thumbnail
