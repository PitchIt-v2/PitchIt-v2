const app = require('../server/server.js');
const request = require('supertest');

// Here we will be unit testing the 3 main database functions from server/db/markets.js
/**
 * Read the docs! https://www.npmjs.com/package/supertest
//  */




describe('Route integration', () => {
  beforeEach( async () => {
    const response = await request(app)
          .post('/user/signup')
          .send({
            username: 'servertesting',
            password: 'servertesting'
          })
          expect(response.statusCode).toBe(200)
        })
    //take the response body with the username pass and id, and assign deleteId to the res.body.id


//const { user_id } = req.body;
//const queryStr = `DELETE FROM users WHERE users.id = '${user_id}'`;

  afterEach(async () => {
    const response = await request(app)
    .delete('/user/')
    .send({
      username: 'servertesting'
    })
    console.log(response)
    expect(response.statusCode).toBe(200)
  })
    
  describe('Should get index file from get to root directory', () => {
    describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and text/html content type', async () => {
          return request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
        });
      });

    describe('should verify login works', () => {
      it('responds with 200 status', async () => {
         const response = await request(app)
          .post('/user/login')
          .send({
            username: 'servertesting',
            password: 'servertesting'
          })
          expect(response.statusCode).toBe(200)
        })
      ;
    });
    xdescribe('should get request for teaminfo', () => {
      it('responds with 200 status', () =>
        request(app)
          .get('/db/teaminfo/i5ddjui57lnyf8bkvq23g')
          .expect(200));
    });
  });

  xdescribe('POST, database', () => {
    describe('should verify user login', () => {
      it('responds with the username and password', () =>
        request(app)
          .post('/db/login')
          .send({
            username: 'test',
            password: 'test'
          })
          .expect(200));
    });

    xdescribe('should verify user created', () => {
      it('responds with 200 status and application/json content type', () =>
        request(app)
          .post('/db/register')
          .send({
            username: 'servertesting2',
            password: 'servertesting'
          })
          .expect(200));
    
    xdescribe('should verify that activity was added', () => {        
      it('responds to invalid request with 400 status and error message in body', () => 
        request(app)
          .post('/db/addActivity')
          .send({
            teamid: 'i5ddjui57lnyf8bkvq23g',
            password: 'servertesting'
          })
          .expect(200));
    })});
  });
  xdescribe('GET, API', () => {
    describe('should get activity', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status', async () => {
         const response = await request(app)
          .get('/api/activity/random')
          .expect(200);
          // expect(response.statusCode).toBe(200)
        });
    });
    xdescribe('should get type', () => {
      it('responds with 200 status', () =>
        request(app)
          .get('/api/activity/type')
          .expect(200));
    });
    xdescribe('should get people', () => {
      it('responds with 200 status', () =>
        request(app)
          .get('/api/activity/people/5')
          .expect(200));
    });
  });
  
});