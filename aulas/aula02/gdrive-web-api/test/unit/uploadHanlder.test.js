import {describe, test, expect, jest} from '@jest/globals'
import Routes from '../../src/routes.js'
import UploadHandler from '../../src/uploadHanlder.js'
import TestUtil from '../_util/testUtil.js'
describe('#UploadHandler test suite', () => {
  const ioObj = {
    to: (id) => ioObj,
    emit: (event, message) => {}
  }

  describe('#RegisterEvents', () => {
    test('should call onfile and onFinish functions on busboy instance', () => {
      const uploadHandler = new UploadHandler({
        io: ioObj,
        socketId: '01'
      })
      jest.spyOn(uploadHandler, uploadHandler.onFile.name)
      .mockResolvedValue()

      const headers = {
        'content-type': 'multipart/form-data; boundary='
      }
      const fn = jest.fn()
      uploadHandler.registerEvents(headers, fn)

      const readable = TestUtil.generateReadableStream(['chunk', 'of', 'data'])
      
      readable.on('data', msg => console.log('msg', msg.toString()))
      expect(uploadHandler.onFile).toHaveBeenCalled();
      // expect(fn).toHaveBeenCalled();
    })
  })

})