import {describe, test, expect, jest} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
describe('File Helper', () => {
  
  describe('#getFileStatus', () => {
    test('#it should return files status in correct format',async  ()=> {
      const statMock = 
        {
          dev: 2050,
          mode: 33279,
          nlink: 1,
          uid: 1000,
          gid: 1000,
          rdev: 0,
          blksize: 4096,
          ino: 319498,
          size: 22126,
          blocks: 48,
          atimeMs: 1631011065771.0027,
          mtimeMs: 1631011065588.4968,
          ctimeMs: 1631011065588.4968,
          birthtimeMs: 0,
          atime: '2021-09-07T10:37:45.771Z',
          mtime: '2021-09-07T10:37:45.588Z',
          ctime: '2021-09-07T10:37:45.588Z',
          birthtime: "1970-01-01T00:00:00.000Z"
        }

        const mockUser = 'root'
        process.env.USER = mockUser
        const filename = 'file.png'

        jest.spyOn(fs.promises, fs.promises.readdir.name)
            .mockResolvedValue([filename])
        jest.spyOn(fs.promises, fs.promises.stat.name)
            .mockResolvedValue(statMock)

        const result = await FileHelper.getFileStatus('/tmp')
        const expectResult = [
        {
          size: '22.1 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]
      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectResult)
    })
  })
})
