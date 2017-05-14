/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }] */
import { h, Component } from 'preact'

import Thumbnail from '../thumbnail/thumbnail'

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.width = props.width || 1000
    this.spacing = props.spacing || 10
    this.photosPerRow = props.photosPerRow || 4
    this.photos = this.normalizePhotoDimensions(props.photos || [])
  }
  normalizePhotoDimensions (photos) {
    let i, chunk, normalizationRatio
    let summaryWidth = this.width - (this.photosPerRow - 1) * this.spacing
    let normalizedPhotos = []

    for (i = 0; i < photos.length; i += this.photosPerRow) {
      chunk = photos.slice(i, i + this.photosPerRow)
      chunk = chunk.map(photo => {
        photo.width *= summaryWidth / photo.height
        photo.height *= summaryWidth / photo.height
        return photo
      })
      normalizationRatio = summaryWidth / chunk.map(photo => photo.width).reduce((width, acc) => acc + width)
      chunk = chunk.map(photo => {
        photo.width = Math.round(photo.width * normalizationRatio)
        photo.height = Math.round(photo.height * normalizationRatio)
        return photo
      })

      normalizedPhotos = normalizedPhotos.concat(chunk)
    }

    return normalizedPhotos
  }

  render () {
    return (
      <div className='gallery' style={{ width: this.width }}>
        {
        this.photos.map((photo) => {
          return (
            <Thumbnail key={photo.uuid} url={photo.url} width={photo.width} height={photo.height} />
          )
        })
      }
      </div>
    )
  }
}

export default Gallery
