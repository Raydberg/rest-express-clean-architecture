import { TodoEntity } from "../../../../src/domain/entity/todo.entity"
import { TodoRepository } from "../../../../src/domain/repositories/todo.repository"
import { CreateTodo } from "../../../../src/domain/use-cases/todo/create-todo"
import { GetTodo } from "../../../../src/domain/use-cases/todo/get-todo"

describe("Get todo use case", () => {

    const mockRepository: jest.Mocked<TodoRepository> = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    }


    const getTodoUseCase = new GetTodo(mockRepository)


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test return when get by id called", async () => {

        const todoId = 1
        const expectedTodo = new TodoEntity("1", "Todo", new Date())
        mockRepository.findById.mockResolvedValue(expectedTodo)
        const result = await getTodoUseCase.execute(todoId)

        expect(result.id).toEqual(expectedTodo.id)
        expect(result.text).toEqual(expectedTodo.text)
        expect(result.completedAt).toEqual(expectedTodo.completedAt)
        expect(mockRepository.findById).toHaveBeenCalledWith(todoId)
        expect(mockRepository.findById).toHaveBeenCalledTimes(1)
    })

    test("should propagate error when todo is not found", async () => {

        const todoId = 999
        const error = new Error(`Todo with id ${todoId} not found`)

        mockRepository.findById.mockRejectedValue(error)

        await expect(getTodoUseCase.execute(todoId)).rejects.toThrow(
            `Todo with id ${todoId} not found`
        )

        expect(mockRepository.findById).toHaveBeenCalledWith(todoId)
        expect(mockRepository.findById).toHaveBeenCalledTimes(1)
    })


})