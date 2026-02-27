import { UpdateTodoDto } from "../../../../src/domain/dtos/todos/update-todo.dto"

describe("update-todo.dto.ts", () => {


    test("should test return all properties", () => {
        const props = { id: 1, text: "Todo test", completedAt: "2023-10-05" }
        const [error, dto] = UpdateTodoDto.create(props)
        expect(error).toBeUndefined()
        expect(dto).toBeInstanceOf(UpdateTodoDto)
        expect(dto?.completedAt).toBeInstanceOf(Date)
    })

    test("should test return error for completedAt", () => {
        const props = { id: 1, text: "Todo test", completedAt: "dsdasd" }
        const [error, dto] = UpdateTodoDto.create(props)
        expect(error).toBe("CompletedAt must be a valid date")
        expect(dto).toBeUndefined()
    })

    test("should test return error for id", () => {
        const props = { id: "fwwe", text: "Todo test" }
        const [error, dto] = UpdateTodoDto.create(props)
        expect(error).toBe("id must be a valid number")
        expect(dto).toBeUndefined()
    })

    test("should test return values method", () => {
        const props = { id: 1, text: "Update me", completedAt: "2023-10-05" }
        const [error, dto] = UpdateTodoDto.create(props)
        expect(dto?.values).toEqual({
            text: 'Update me',
            completedAt: new Date("2023-10-05")
        })
        expect(dto?.values.id).toBeUndefined()
        expect(error).toBeUndefined()
    })

    test("should create DTO with only id and text", () => {
        const props = { id: 1, text: "Only text" }
        const [error, dto] = UpdateTodoDto.create(props)
        expect(error).toBeUndefined()
        expect(dto?.values).toEqual({ text: 'Only text' })
        expect(dto?.text).toBe("Only text")
        expect(dto?.completedAt).toBeUndefined()
    })
})


