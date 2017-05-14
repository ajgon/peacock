/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }] */
import { h, Component } from 'preact'

class Thumbnail extends Component {
  render () {
    const url = this.props.url

    return (
      <div className='thumbnail'>
        <img src={url} style={{ width: this.props.width, height: this.props.height }} />
      </div>
    )
  }
}

export default Thumbnail
