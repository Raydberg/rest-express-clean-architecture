import { prisma } from "../../../src/config/lib/prisma"
import { TodoDataSource } from "../../../src/domain/datasources/todo.datasources"
import { CreateTodoDto } from "../../../src/domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../../src/domain/dtos/todos/update-todo.dto"
import { TodoEntity } from "../../../src/domain/entity/todo.entity"
import { TodoDataSourceImpl } from "../../../src/infrastructure/datasource/todo.datasource.impl"

describe("Todo datasource impl", () => {

    beforeAll(async () => {
        await prisma.$connect()
        await prisma.todo.deleteMany()
    })

    afterEach(async () => {
        await prisma.todo.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    const prismaDatasource = new TodoDataSourceImpl()

    test("Should create todo in DB and return TodoEntity", async () => {
        const dto = { text: "Todo" } as CreateTodoDto
        const newTodo = await prismaDatasource.create(dto)

        // console.log(newTodo)
        expect(newTodo).toBeInstanceOf(TodoEntity)
        expect(newTodo.id).toEqual(expect.any(Number))
        expect(newTodo.text).toEqual(dto.text)
    })

    test("should find by id and return TodoEntity", async () => {
        const todo = { text: "Todo" } as CreateTodoDto
        const newTodo = await prismaDatasource.create(todo)

        const todoReturn = await prismaDatasource.findById(Number(newTodo.id))
        console.log(todoReturn)
        expect(todoReturn).toBeInstanceOf(TodoEntity)
        expect(todoReturn.id).toEqual(expect.any(Number))
        expect(todoReturn.text).toEqual(newTodo.text)
    })

    test("should update todo in DB and return TodoEntity", async () => {
        const todo = await prismaDatasource.create({ text: "Todo new" } as CreateTodoDto)

        // const todoUpdate = await prismaDatasource.update({ id: todo.id, text: "Todo update" } as UpdateTodoDto)


    })

})