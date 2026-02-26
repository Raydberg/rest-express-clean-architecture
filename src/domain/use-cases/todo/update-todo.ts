import type { UpdateTodoDto } from "../../dtos/todos/update-todo.dto";
import type { TodoEntity } from "../../entity/todo.entity";
import type { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(private readonly repository: TodoRepository) { }
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.update(dto)
    }
}