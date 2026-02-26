import type { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import type { TodoEntity } from "../../entity/todo.entity";
import type { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
    constructor(private readonly repository: TodoRepository) { }
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto)
    }
}