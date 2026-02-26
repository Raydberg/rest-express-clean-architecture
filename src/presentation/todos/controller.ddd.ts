import type { Request, Response } from "express"
import { prisma } from "../../config/lib/prisma"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto"
import type { TodoRepository } from "../../domain/repositories/todo.repository"

export class TodosController {

    constructor(private readonly todoRepository: TodoRepository) { }

    getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll()
        return res.json(todos)
    }

    getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id!
        try {
            const todo = await this.todoRepository.findById(id)
            return res.json(todo)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })
        const todo = await this.todoRepository.create(createTodoDto!)
        res.json(todo)
    }

    updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) return res.status(400).json({ error })
        const todoUpdate = await this.todoRepository.update(updateTodoDto!)
        return res.json(todoUpdate)
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!
        const todo = await this.todoRepository.deleteById(id)
        return res.json(todo)
    }
}