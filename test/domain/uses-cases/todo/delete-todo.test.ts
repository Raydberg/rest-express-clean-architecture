import { TodoEntity } from "../../../../src/domain/entity/todo.entity"
import { TodoRepository } from "../../../../src/domain/repositories/todo.repository"
import { DeleteTodo } from "../../../../src/domain/use-cases/todo/delete-todo"

describe("Delete Todo Use case", () => {

    const mockRepository: jest.Mocked<TodoRepository> = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    }


    const deleteTodoUseCase = new DeleteTodo(mockRepository)


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test return when delete called method", async () => {
        const todoId = 1
        const expetecValue = new TodoEntity("1", "Todo test", null)

        mockRepository.deleteById.mockResolvedValue(expetecValue)

        const result = await deleteTodoUseCase.execute(todoId)

        expect(result.id).toEqual(expetecValue.id)
        expect(result.text).toEqual(expetecValue.text)
        expect(result.completedAt).toBeNull()
        expect(mockRepository.deleteById).toHaveBeenCalledWith(todoId)
        expect(mockRepository.deleteById).toHaveBeenCalledTimes(1)
    })
})