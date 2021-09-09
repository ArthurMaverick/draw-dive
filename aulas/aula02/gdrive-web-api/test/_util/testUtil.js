import { read } from 'fs'
import  {Readable} from 'stream'
export default class TestUtil {
  
  static generateReadableStream(dataStream) {
    return new Readable({
      objectMode: true,
      async read() {
        for( const chunck of dataStream) {

          this.push(chunck)
        }
        this.push(null)
      }
    })
  }
}