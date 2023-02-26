const Server = require('../server');
const request = require('supertest');

describe('Test server', () => {
    let server;
  
    beforeAll(() => {
      const app = new Server();
      server = app.listen();
    });
  
    afterAll((done) => {
      server.close(done);
    });
  
    it('should return 200 OK', () => {
      return request(server).get('/').expect(200);
    });
  });