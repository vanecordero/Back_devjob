
const moongose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index.js')

const api = supertest(app)


test('Jobs are returnes as JSON', async()=>{
  await api.get('/api/jobs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  moongose.connection.close()
  server.close()
})