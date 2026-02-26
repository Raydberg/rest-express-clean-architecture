import type { TodoDataSource } from "../../domain/datasources/todo.datasources";
import type { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import type { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import type { TodoEntity } from "../../domain/entity/todo.entity";
import type { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDataSource
    ) { }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id)
    }
    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.update(updateTodoDto)
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }

}