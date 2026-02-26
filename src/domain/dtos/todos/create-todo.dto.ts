
export class CreateTodoDto {
    constructor(
        public readonly text: string
    ) {
    }

    static create(props: { [key: string]: any }): [(string | undefined)?, CreateTodoDto?] {
        const { text } = props
        if (!text) return ["Text property is required"]
        return [undefined, new CreateTodoDto(text)]
    }

}