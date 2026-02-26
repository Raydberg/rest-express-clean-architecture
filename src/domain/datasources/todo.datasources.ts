import type { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import type { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import type { TodoEntity } from "../entity/todo.entity";

export abstract class TodoDataSource {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
    abstract getAll(): Promise<TodoEntity[]>
    abstract findById(id: number): Promise<TodoEntity>
    abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>
}