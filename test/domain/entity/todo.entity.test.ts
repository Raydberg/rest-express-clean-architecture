import { TodoEntity } from "../../../src/domain/entity/todo.entity"

describe('todo.entity.ts', () => {
    test("should test for fromObject method", () => {
        const obj = { id: 1, text: "Test", completedAt: "2023-10-05" }
        const todo = TodoEntity.fromObject(obj)

        expect(todo).toBeInstanceOf(TodoEntity)
        expect(todo.id).toBe(1)
        expect(todo.text).toBe("Test")
        expect(todo.completedAt).toBeInstanceOf(Date)
        expect(todo.isCompleted).toBeTruthy()
    })

    test("should return error completedAt", () => {
        const obj = { id: 1, text: "Test", completedAt: "dsddsd" }
        expect(() => TodoEntity.fromObject(obj)).toThrow("CompletedAt is not a valid date")
    })

    test("should return error if id not provider", () => {
        const obj = { text: "Test" }
        expect(() => TodoEntity.fromObject(obj)).toThrow("Id is required")
    })

    test("should return error if text not provider", () => {
        const obj = { id: 1 }
        expect(() => TodoEntity.fromObject(obj)).toThrow("text is requited")
    })

    test("should have isCompleted as false if completedAt is null", () => {
        const obj = { id: '1', text: "Test", completedAt: null };
        const todo = TodoEntity.fromObject(obj)
        expect(todo.isCompleted).toBeFalsy()
    })

})
