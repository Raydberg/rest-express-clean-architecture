import type { TodoEntity } from "../../entity/todo.entity";
import type { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {
    constructor(private readonly repository: TodoRepository) { }
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }
}