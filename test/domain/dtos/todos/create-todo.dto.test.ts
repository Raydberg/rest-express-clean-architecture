import { CreateTodoDto } from "../../../../src/domain/dtos/todos/create-todo.dto"

describe("create-todo.dto.ts", () => {
    test("should test return with only text property", () => {
        const props = { text: "text" }
        const [error, createTodoDto] = CreateTodoDto.create(props)
        // console.log(dto)
        expect(error).toBeUndefined()
        expect(createTodoDto).toBeInstanceOf(CreateTodoDto)
        expect(createTodoDto?.text).toBe(props.text)
    })
    test("should test return error", () => {
        const props = {}

        const [error, createTodoDto] = CreateTodoDto.create(props)
        expect(error).toStrictEqual('Text property is required')
        expect(createTodoDto).toBeUndefined()
    })

    test("should return message error with empty value", () => {
        const props = { text: "" }
        const [error, createTodoDto] = CreateTodoDto.create(props)
        expect(error).toBe("Text property is required")
        expect(createTodoDto).toBeUndefined()
    })

})