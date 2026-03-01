import { TodoRepository } from "../../../../src/domain/repositories/todo.repository"
import { UpdateTodo } from "../../../../src/domain/use-cases/todo/update-todo"

describe("Update Todos use case", () => {

    const mockRepository: jest.Mocked<TodoRepository> = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    }


    const updateTodoUseCase = new UpdateTodo(mockRepository)


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test return when update called method", async () => {

    })
})