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
  { uuid: 'd59b2c0d-18aa-411f-959b-5cb683c9a6ff', url: 'https://placehold.it/1200x300', width: 1200, height:  300 },
  { uuid: '242c3f45-9630-4de0-9472-2927ac97226e', url: 'https://placehold.it/798x636', width: 798, height: 636 },
  { uuid: '3d567a43-aa8f-44a2-b24c-d93f7e00a84a', url: 'https://placehold.it/1143x1032', width: 1143, height: 1032 },
  { uuid: '981d6992-c079-4391-b324-6ab129ccaaa8', url: 'https://placehold.it/489x822', width: 489, height: 822 },
  { uuid: 'bcb64426-9e9c-48ae-af0d-04a711d2cd28', url: 'https://placehold.it/939x502', width: 939, height: 502 },
  { uuid: "522b00ac-aa1b-4b9f-804c-2a75884aded8", url: "https://placehold.it/1000x1000", width: 1000, height: 1000 },
  { uuid: "70600d3f-1b1f-4864-be9c-ab1bab7dbc65", url: "https://placehold.it/1000x1000", width: 1000, height: 1000 },
  { uuid: "682f714d-cf6c-4145-88e2-543e296c9635", url: "https://placehold.it/1000x1000", width: 1000, height: 1000 },
  { uuid: "13c97c37-eb8e-4b14-832c-f6f1e572b695", url: "https://placehold.it/1000x1000", width: 1000, height: 1000 },
  { uuid: "2aa8b1df-ae6d-4df4-96e5-a577818b9770", url: "https://placehold.it/867x1117", width: 867, height: 1117 },
  { uuid: "ce97f4b9-59e6-4608-8421-18e248434c32", url: "https://placehold.it/842x532", width: 842, height: 532 },
  { uuid: "5e04a707-d722-4f32-bb2d-873d14bb06e3", url: "https://placehold.it/844x1139", width: 844, height: 1139 },
  { uuid: "228e211d-e44d-481b-ab10-fedac8d4485f", url: "https://placehold.it/1203x1217", width: 1203, height: 1217 },
  { uuid: "af215434-ae50-47c6-96b6-a872b5b4a529", url: "https://placehold.it/984x478", width: 984, height: 478 },
  { uuid: "f90c3082-1b84-4d95-95aa-59d92ff530ae", url: "https://placehold.it/1130x585", width: 1130, height: 585 },
  { uuid: "dbf754d8-0297-49c4-ae97-88063ed66725", url: "https://placehold.it/919x430", width: 919, height: 430 },
  { uuid: "51362304-30c0-4d4e-bc6f-44f162bde53b", url: "https://placehold.it/866x1285", width: 866, height: 1285 },
  { uuid: "12dc2c00-067c-4874-843d-c9fb778e2fdc", url: "https://placehold.it/1035x1109", width: 1035, height: 1109 },
  { uuid: "59547d21-43b7-4180-9a12-7bbfd81f3fa3", url: "https://placehold.it/1144x1234", width: 1144, height: 1234 },
  { uuid: "8bb288fe-a124-4dab-a48b-621618fe04df", url: "https://placehold.it/631x459", width: 631, height: 459 },
  { uuid: "f29666d8-7822-42e5-ba83-cffa4a3a724e", url: "https://placehold.it/1366x980", width: 1366, height: 980 },
  { uuid: "167da822-13b4-47e5-81e2-601e03a3f3b8", url: "https://placehold.it/1037x945", width: 1037, height: 945 },
  { uuid: "8bacad88-8827-4356-b47a-12de910a8b1c", url: "https://placehold.it/1381x635", width: 1381, height: 635 },
  { uuid: "9649f629-d56d-4552-8ca4-728fff908e9f", url: "https://placehold.it/1410x535", width: 1410, height: 535 },
  { uuid: "f109faca-a725-41d2-981f-727cdb86d4dc", url: "https://placehold.it/1098x1232", width: 1098, height: 1232 },
  { uuid: "3d5de0c7-9c85-4c63-a6fb-239db405da2d", url: "https://placehold.it/1465x767", width: 1465, height: 767 },
  { uuid: "b6f01a11-d451-48f8-b48e-e77f89921dbe", url: "https://placehold.it/760x936", width: 760, height: 936 },
  { uuid: "07e0867b-09b2-4df7-a3ca-cf0592bb5e69", url: "https://placehold.it/539x1172", width: 539, height: 1172 },
  { uuid: "e8b2174d-71c4-4ae6-8acc-474b6b5f2f7f", url: "https://placehold.it/406x548", width: 406, height: 548 },
  { uuid: "d30962af-111e-4262-ba35-a2176140caaa", url: "https://placehold.it/937x945", width: 937, height: 945 },
  { uuid: "f585fe33-20cf-42ed-8361-cfc9d31583b6", url: "https://placehold.it/1080x911", width: 1080, height: 911 },
  { uuid: "379d6213-49ff-4208-916c-9909b48cff18", url: "https://placehold.it/905x653", width: 905, height: 653 },
  { uuid: "554e754f-69da-424e-a38c-cf743b4d63e7", url: "https://placehold.it/851x911", width: 851, height: 911 },
  { uuid: "8aa53bfb-5365-40d0-990e-ae469b12cb0d", url: "https://placehold.it/1233x744", width: 1233, height: 744 },
  { uuid: "49ceac85-fefb-4f79-8cef-8aeb78c7a1b9", url: "https://placehold.it/695x1143", width: 695, height: 1143 },
]

let rootNode = <Gallery photos={PHOTOS} />

if (typeof document !== 'undefined') {
  // we are in browser

  // uncomment for hydrate debug
  //function watch(obj, method) {
    //let p = obj[method];
    //obj[method] = function(...args) {
      //console.log(method+' called: ', ...args);
      //return p.apply(this, args)
    //};
  //}

  //watch(Element.prototype, 'appendChild');
  //watch(Element.prototype, 'replaceChild');
  //watch(Element.prototype, 'insertBefore');

  render(rootNode, document.body, document.body.firstChild)
}

export default (locals) => {
  if (typeof document === 'undefined') {
    // we are in static site generator

    const assets = Object.keys(locals.webpackStats.compilation.assets);
    const css = assets.filter(value => value.match(/\.css$/));
    const js = assets.filter(value => value.match(/\.js$/));

    let body_data = renderToString(rootNode)
    let head_data = ''

    js.forEach((file) => {
        body_data += `<script type="text/javascript" src="${file}"></script>`
    })

    css.forEach((file) => {
        head_data += `<link rel="stylesheet" href="${file}">`
    })
    return HTML.replace('<body>', '<body>' + body_data).replace('</head>', head_data + '</head>')
  }
}
