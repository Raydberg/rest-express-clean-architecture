import { TodoDataSource } from "../../../src/domain/datasources/todo.datasources"
import { CreateTodoDto } from "../../../src/domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../../src/domain/dtos/todos/update-todo.dto"
import { TodoEntity } from "../../../src/domain/entity/todo.entity"

describe("Datasource.test.ts", () => {
    class MockTodoDatasource implements TodoDataSource {
        create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
            throw new Error("Method not implemented.")
        }
        getAll(): Promise<TodoEntity[]> {
            throw new Error("Method not implemented.")
        }
        findById(id: number): Promise<TodoEntity> {
            throw new Error("Method not implemented.")
        }
        update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
            throw new Error("Method not implemented.")
        }
        deleteById(id: number): Promise<TodoEntity> {
            throw new Error("Method not implemented.")
        }
    }
    const mockTodoDatasource = new MockTodoDatasource()

    test("should  test have all method in MockTodoDatasource", async () => {
        expect(mockTodoDatasource).toBeInstanceOf(MockTodoDatasource)
        expect(mockTodoDatasource).toHaveProperty("create")
        expect(mockTodoDatasource).toHaveProperty("getAll")
        expect(mockTodoDatasource).toHaveProperty("findById")
        expect(mockTodoDatasource).toHaveProperty("update")
        expect(mockTodoDatasource).toHaveProperty("deleteById")
    })

    test("should test expectec for type method", async () => {
        // console.log(typeof mockTodoDatasource.deleteById)
        expect(typeof mockTodoDatasource.create).toBe("function")
        expect(typeof mockTodoDatasource.deleteById).toBe("function")
        expect(typeof mockTodoDatasource.findById).toBe("function")
        expect(typeof mockTodoDatasource.getAll).toBe("function")
        expect(typeof mockTodoDatasource.update).toBe("function")
    })

})