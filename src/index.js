/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }] */
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { render as renderToString } from 'preact-render-to-string'
import { render, h } from 'preact'

import HTML from './index.html'
import Gallery from './gallery/gallery'

OfflinePluginRuntime.install()

const PHOTOS = [
  { uuid: 'c50f3480-08b1-4927-9035-4a1332ed5394', url: 'https://placehold.it/400x300', width: 400, height: 300 },
  { uuid: 'e1aeacdb-532a-43d0-97e5-e6f29d75fc79', url: 'https://placehold.it/800x450', width: 800, height: 450 },
  { uuid: '3c0ac6c8-15be-418b-93b9-6b822c0d774b', url: 'https://placehold.it/600x600', width: 600, height: 600 },
  { uuid: 'd59b2c0d-18aa-411f-959b-5cb683c9a6ff', url: 'https://placehold.it/1200x300', width: 1200, height: 300 }
]

let rootNode = <Gallery photos={PHOTOS} />

if (typeof document !== 'undefined') {
  // we are in browser

  render(rootNode, document.body, document.body.firstChild)
}

export default (locals) => {
  if (typeof document === 'undefined') {
    // we are in static site generator

    let data = renderToString(rootNode)
    for (let id in locals.assets) {
      if (locals.assets.hasOwnProperty(id)) {
        data += `<script type="text/javascript" src="${locals.assets[id]}"></script>`
      }
    }
    return HTML.replace('<body>', '<body>' + data)
  }
}
