import supertest from 'supertest'
import app from './../index'

const request = supertest(app)

describe('GET /api/convert', () => {
  it('Valid Case: GET /api/convert?filename=fjord.jpg&width=500&height=500', async () => {
    const response = await request.get(
      '/api/convert?filename=fjord.jpg&width=500&height=500'
    )
    expect(response.status).toBe(200)
  })

  it('Invalid Case: GET /api/convert?filename=dsdsds.jpg&width=500&height=500', async () => {
    const response = await request.get(
      '/api/convert?filename=dsds.jpg&width=500&height=500'
    )
    expect(response.status).toBe(404)
  })
})
