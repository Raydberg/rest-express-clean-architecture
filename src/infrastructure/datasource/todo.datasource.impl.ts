import { prisma } from "../../config/lib/prisma";
import type { TodoDataSource } from "../../domain/datasources/todo.datasources";
import type { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import type { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entity/todo.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class TodoDataSourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        return TodoEntity.fromObject(todo)

    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()
        return todos.map(todo => TodoEntity.fromObject(todo))
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404)
        return TodoEntity.fromObject(todo)
    }
    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id)
        const todoUpdate = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto?.values!
        });
        return TodoEntity.fromObject(todoUpdate)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id)
        const deleted = await prisma.todo.delete({
            where: {
                id
            }
        })
        return TodoEntity.fromObject(deleted)
    }

}