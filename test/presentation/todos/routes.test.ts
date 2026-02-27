
import request from 'supertest'
import { disconnectPrisma, prisma } from '../../../src/config/lib/prisma'
import { testServer } from '../../test-server'

describe("Testing in routes", () => {

    beforeAll(async () => {
        await testServer.start()
    })

    afterAll(async () => {
        testServer.close()
        Promise.all([
            await disconnectPrisma(),
            await prisma.todo.deleteMany()
        ]
        )
    })

    afterEach(async () => {
        await prisma.todo.deleteMany()
    })


    const todo1 = { text: "Todo 1" };
    const todo2 = { text: "Todo 2" };

    test("Should return TODOs api/todos ", async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })


        const { body } = await request(testServer.app)
            .get("/api/todos")
            .expect(200);
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBe(2)
        expect(body[0].text).toBe(todo1.text)
        expect(body[1].text).toBe(todo2.text)
        expect(body[0].completedAt).toBeNull()
    })

    test("Should return a TODO api/todo/:id", async () => {
        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual(expect.objectContaining({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt
        }))

    })
    test("should return a 404 NotFound  api/todo/:id", async () => {

        const todoId = 999
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(400)
        expect(body).toEqual(expect.objectContaining({
            error: `Todo with id ${todoId} not found`
        }))
    })


    test("Should return a new TODO api/todos", async () => {

        const { body } = await request(testServer.app)
            .post("/api/todos")
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })
    })

    test("Should return a error if text is not present api/todos", async () => {

        const { body } = await request(testServer.app)
            .post("/api/todos")
            .send({})
            .expect(400)

        expect(body).toEqual({ error: 'Text property is required' })
    })

    test("Should return a error if text is empty api/todos", async () => {

        const { body } = await request(testServer.app)
            .post("/api/todos")
            .send({ text: "" })
            .expect(400)


        expect(body).toEqual({ error: 'Text property is required' })
    })


    test("Should return an update TODO api/todos", async () => {

        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: "Hola Mundo update", completedAt: "2023-10-21" })
            .expect(200)
        expect(body).toEqual({
            id: expect.any(Number),
            text: "Hola Mundo update",
            completedAt: '2023-10-21T00:00:00.000Z'
        })
    })
    test("Should return 404 if todo not found", async () => {

        const todoId = "999"
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({ text: "Hola Mundo update", completedAt: "2023-10-21" })
            .expect(400)

        // console.log(body)
        expect(body).toEqual({ error: `Todo with id ${todoId} not found` })
    })

    test("Should return an update TODO only the date", async () => {

        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt: "2023-10-21" })
            .expect(200)

        // console.log(typeof body.completedAt)
        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: body.completedAt
        })
    })

    test("Should return an update TODO only the text", async () => {

        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: "Hola Update" })
            .expect(200)

        // console.log(body)
        expect(body).toEqual({
            id: expect.any(Number),
            text: body.text,
            completedAt: todo.completedAt
        })
    })
    test("Should return an update TODO only data", async () => {

        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({})
            .expect(200)

        // console.log(body)
        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: todo.completedAt
        })
    })
    test("Should delete a TODO api/todos/:id", async () => {

        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: todo.completedAt
        })
    })

    test("Should return 404 if todo not found api/todo/:id", async () => {

        const todoId = "999"

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(400)
        console.log(body)

        expect(body).toEqual({ error: 'Todo with id 999 not found' })
    })
})


