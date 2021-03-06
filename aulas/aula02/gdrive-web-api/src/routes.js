import FileHelper from './fileHelper.js'
import {logger}  from'./logger.js'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadFolder = resolve(__dirname, '../', 'downloads')

export default class Routes {
  constructor(downloadsFolder = defaultDownloadFolder) {
    this.downloadFolder = downloadsFolder
    this.fileHelper = FileHelper
  }
  setSocketInstance(io) {
    this.io = io
  }

 async defaultRoute(request, response) {
    response.end('hello world')
  }

  async options(request, response) {
   response.writeHead(204)
   response.end('hello world')
  }

  async post(request, response) {
    logger.info('post')
    response.end()
  }

  async get(request, response) {
    const files = await this.fileHelper.getFileStatus(this.downloadFolder)
    response.writeHead(200)
    response.end(JSON.stringify(files))
  }

  async handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute
    chosen.apply(this, [request, response])
  }
}