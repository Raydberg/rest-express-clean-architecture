import { CreateTodoDto } from "../../../../src/domain/dtos/todos/create-todo.dto"
import { TodoEntity } from "../../../../src/domain/entity/todo.entity"
import { TodoRepository } from "../../../../src/domain/repositories/todo.repository"
import { CreateTodo } from "../../../../src/domain/use-cases/todo/create-todo"

describe("test for Create Todo use case", () => {

    const mockRepository: jest.Mocked<TodoRepository> = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    }


    const createTodoUseCase = new CreateTodo(mockRepository)


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test return when create called", async () => {
        //Arrange
        const dto = {} as CreateTodoDto
        const expectedValie = new TodoEntity("1", "Todo", null)
        //Act

        mockRepository.create.mockResolvedValue(expectedValie)
        const result = await createTodoUseCase.execute(dto)

        //Assert
        expect(result).toEqual(expectedValie)
        expect(mockRepository.create).toHaveBeenCalledWith(dto)
        expect(mockRepository.create).toHaveBeenCalledTimes(1)
    })

    test("should return error when create called with emoty properties", async () => {
        const dto = {} as CreateTodoDto
        mockRepository.create.mockRejectedValue(new Error("Internal server error - check logs"))
        await expect(createTodoUseCase.execute(dto)).rejects.toThrow(
            "Internal server error - check logs"
        )
        expect(mockRepository.create).toHaveBeenCalledWith(dto)
    })


})