import {describe, test, expect, jest} from '@jest/globals'
import Routes from '../../src/routes.js'
describe('Route test suite', () => {
  const defaultParams = {
    request: {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: '', 
      body: {}
    },
    reponse: {
      setHeader: jest.fn(),
      writeHead: jest.fn(),
      end: jest.fn(),
    },
    values: () => Object.values(defaultParams),
  }
  describe('Route test suite', () => {
    test('#setSocket should store io instance', ()=> {
      const routes = new Routes()
      const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => {}
      }
      routes.setSocketInstance(ioObj)
      expect(routes.io).toStrictEqual(ioObj)
    })
  })

  describe('#handler', () => {
    
    test('given an inexistent route it should choose default route', async()=> {
      const routes = new Routes()
      const params = {...defaultParams}
      params.request.method = 'inexistent'
     await routes.handler(...params.values())
      expect(params.reponse.end).toHaveBeenCalledWith('hello world');
    })
    test('it should set any resquest with CORS enable', async ()=> {
      const routes = new Routes()
      const params = {...defaultParams}
      
      params.request.method = 'inexistent'
      await routes.handler(...params.values())

      expect(params.reponse.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    })
    test('given method OPTIONS it should choose options route', async ()=> {
      const routes = new Routes()
      const params = {...defaultParams}
      
      params.request.method = 'OPTIONS'
      await routes.handler(...params.values())

      expect(params.reponse.writeHead).toHaveBeenCalledWith(204);
      expect(params.reponse.end).toHaveBeenCalled();
    })

    test('given method POST it should choose post route', async ()=> {
      const routes = new Routes()
      const params = {...defaultParams}
      
      params.request.method = 'POST'
      jest.spyOn(routes, routes.post.name).mockResolvedValue()
      await routes.handler(...params.values())

      expect(routes.post).toHaveBeenCalled();
    })

    test('given method GET it should choose get route',async ()=>{
      const routes = new Routes()
      const params = {...defaultParams}
      
      params.request.method = 'GET'
      jest.spyOn(routes, routes.get.name).mockResolvedValue()
      await routes.handler(...params.values())

      expect(routes.get).toHaveBeenCalled();
    })
  })

  describe('#get', ()=> {
    test.skip('given method GET it should list all files donwloaded', async ()=>{
      const routes = new Routes()
      const params = {...defaultParams}

     const filesStatusMock = [{
      size: '22.1 kB',
      lastModified: "1970-01-01T00:00:00.000Z",
      owner: 'root',
      file: 'file.png'
    }]

      jest.spyOn(routes.fileHelper, routes.fileHelper.getFileStatus.name)
        .mockResolvedValue(filesStatusMock)

        params.request.method = 'GET'
        
        await routes.handler(...params.values())

        expect(params.reponse.writeHead).toHaveBeenCalledWith(200);
        expect(params.reponse.end).toHaveBeenCalledWith(JSON.stringify(filesStatusMock));
    })
  })

})