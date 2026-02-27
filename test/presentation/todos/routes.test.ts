
import request from 'supertest'
import { disconnectPrisma } from '../../../src/config/lib/prisma'
import { testServer } from '../../test-server'

describe("Testing in routes", () => {

    beforeAll(async () => {
        await testServer.start()
    })

    afterAll(async () => {
        testServer.close()
        await disconnectPrisma()
    })

    test("Should return TODOs api/todos ", async () => {


        const response = await request(testServer.app)
            .get("/api/todos")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})