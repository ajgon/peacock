/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }] */
import css from './gallery.scss'
import { h, Component } from 'preact'

import Thumbnail from '../thumbnail/thumbnail'

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.width = props.width || 1000
    this.spacing = props.spacing || 10
    this.determineGrid((props.photos || []).length)

    this.photos = this.normalizePhotoDimensions(props.photos || [])
  }
  determineGrid (itemsCount) {
    switch(true) {
      case itemsCount % 3 == 1:
        this.photosPerRow = 3
        this.lastColumnSize = 4
        break
      case itemsCount % 4 == 1:
        this.photosPerRow = 4
        this.lastColumnSize = 5
        break
      case itemsCount % 3 == 0:
        this.photosPerRow = 3
        this.lastColumnSize = 0
        break
      case itemsCount % 4 == 0:
        this.photosPerRow = 4
        this.lastColumnSize = 0
        break
      case itemsCount % 3 == 2:
        this.photosPerRow = 3
        this.lastColumnSize = 5
        break
      default:
        this.photosPerRow = itemsCount
        this.lastColumnSize = 0
    }
  }
  normalizePhotoDimensions (photos) {
    let i = 0
    let normalizedPhotos = []
    let lastColumnChunk = []
    for (i = 0; i < this.lastColumnSize; i += 1) {
      lastColumnChunk.push(photos.pop())
    }

    for (i = 0; i < photos.length; i += this.photosPerRow) {
      normalizedPhotos = normalizedPhotos.concat(this.normalizeChunk(photos.slice(i, i + this.photosPerRow)))
    }
    normalizedPhotos = normalizedPhotos.concat(this.normalizeChunk(lastColumnChunk))

    return normalizedPhotos
  }
  normalizeChunk (chunk) {
    let normalizationRatio
    let maxAllowedWidth = this.width - (chunk.length - 1) * this.spacing

    if (chunk.length === 0) {
      return chunk
    }

    chunk = chunk.map(photo => {
      photo.width *= maxAllowedWidth / photo.height
      photo.height *= maxAllowedWidth / photo.height
      return photo
    })
    normalizationRatio = maxAllowedWidth / chunk.map(photo => photo.width).reduce((width, acc) => acc + width)
    chunk = chunk.map(photo => {
      photo.width = photo.width * normalizationRatio
      photo.height = photo.height * normalizationRatio
      return photo
    })

    return chunk
  }

  render () {
    return (
      <div className={css.container}>
        <div className={css.photos} style={{ width: this.width }}>
          {
          this.photos.map((photo, idx) => {
            return (
              <Thumbnail key={photo.uuid} url={photo.url} width={photo.width} height={photo.height} spacing={this.spacing}  />
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default Gallery
