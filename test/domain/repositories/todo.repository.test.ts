import { CreateTodoDto } from "../../../src/domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../../src/domain/dtos/todos/update-todo.dto";
import { TodoEntity } from '../../../src/domain/entity/todo.entity';
import { TodoRepositoryImpl } from "../../../src/infrastructure/repositories/todo.repository.impl"

describe("todo.repository.ts", () => {

    const mockDatasource = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn()
    }

    const mockTodoRepositoryImpl = new TodoRepositoryImpl(mockDatasource)


    beforeEach(() => {
        jest.clearAllMocks()
    })



    test("should test for when create called", async () => {
        // Arrange
        const createTodoDto = { text: "Learn Testing" } as CreateTodoDto;
        const expectedTodo = new TodoEntity("1", "Learn Testing", null)

        // Indicamos que esta funcion resuelve una funcion asincrona y devuelve una promesa
        mockDatasource.create.mockResolvedValue(expectedTodo)

        //Act
        const result = await mockTodoRepositoryImpl.create(createTodoDto)


        //Assert
        expect(mockDatasource.create).toHaveBeenCalledWith(createTodoDto)
        expect(mockDatasource.create).toHaveBeenCalledTimes(1)
        expect(result).toEqual(expectedTodo)
    })

    test("should test for when getAll called", async () => {
        //Arrange
        const mockTodos = [
            new TodoEntity("1", "Test todo 1", null),
            new TodoEntity("2", "Test todo 2", null),
            new TodoEntity("3", "Test todo 3", new Date()),
        ]
        //El get all se resuelve con el array
        mockDatasource.getAll.mockResolvedValue(mockTodos)
        //Act
        const result = await mockTodoRepositoryImpl.getAll()

        //Assert

        expect(mockDatasource.getAll).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockTodos)
        expect(result.length).toBe(3)
    })

    test("should test return when findById  called", async () => {
        //Arrange
        const todoId = 1
        const expectedTodo = new TodoEntity("1", "Text todo", null)

        mockDatasource.findById.mockResolvedValue(expectedTodo)
        //Act
        const result = await mockTodoRepositoryImpl.findById(todoId)
        //Assert
        expect(result).toEqual(expectedTodo)
        expect(mockDatasource.findById).toHaveBeenCalledWith(todoId)
        expect(mockDatasource.findById).toHaveBeenCalledTimes(1)
    })


    test("should test return error if ID does not exist", async () => {
        //Arrange
        const todoId = 999
        const error = new Error(`Todo with id ${todoId} not found`)
        //Act
        mockDatasource.findById.mockRejectedValue(error)
        await expect(mockTodoRepositoryImpl.findById(todoId)).rejects.toThrow(
            `Todo with id ${todoId} not found`
        )
        //Assert
        expect(mockDatasource.findById).toHaveBeenCalledWith(todoId)
        expect(mockDatasource.findById).toHaveBeenCalledTimes(1)

    })

    test("should test return when update called", async () => {
        //Arrange
        const mockTodo = { text: "Text todo" } as UpdateTodoDto
        const expectedValue = new TodoEntity("1", "Text todo", null)
        //Act

        mockDatasource.update.mockResolvedValue(expectedValue)
        const result = await mockTodoRepositoryImpl.update(mockTodo)
        // console.log(result)

        //Assert
        expect(result).toEqual(expectedValue)
        expect(result.text).toEqual(expectedValue.text)
        expect(result.id).toEqual(expect.any(String))
        expect(mockDatasource.update).toHaveBeenCalledWith(mockTodo)
        expect(mockDatasource.update).toHaveBeenCalledTimes(1)

    })


    test("should test return when deleteById called", async () => {
        //Arrange
        const todoId = 10
        const todoMock = new TodoEntity("10", "Test delete", null)
        //Act
        mockDatasource.deleteById.mockResolvedValue(todoMock)
        const result = await mockTodoRepositoryImpl.deleteById(todoId)

        //Assert

        expect(result).toEqual(todoMock)
        expect(mockDatasource.deleteById).toHaveBeenCalledWith(todoId)
        expect(mockDatasource.deleteById).toHaveBeenCalledTimes(1)
    })

    test("should test returl error if ID does not exist", async () => {

        //Arrange
        const todoId = 99
        const error = new Error(`Todo with id ${todoId} not found`)
        //Act
        mockDatasource.deleteById.mockRejectedValue(error)

        await expect(mockTodoRepositoryImpl.deleteById(todoId)).rejects.toThrow(
            `Todo with id ${todoId} not found`
        )
        //Assert
        expect(mockDatasource.deleteById).toHaveBeenCalledWith(todoId)
        expect(mockDatasource.deleteById).toHaveBeenCalledTimes(1)
    })

})


