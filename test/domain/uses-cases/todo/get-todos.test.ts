import { TodoEntity } from "../../../../src/domain/entity/todo.entity"
import { TodoRepository } from "../../../../src/domain/repositories/todo.repository"
import { GetTodos } from "../../../../src/domain/use-cases/todo/get-todos"

describe('Get Todos use case', () => {

    const mockRepository: jest.Mocked<TodoRepository> = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    }


    const getTodosUseCase = new GetTodos(mockRepository)


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test return when getAll called", async () => {
        const todos: TodoEntity[] = [
            new TodoEntity("1", "Todo 1", null),
            new TodoEntity("2", "Todo 2", new Date())
        ]
    })
})