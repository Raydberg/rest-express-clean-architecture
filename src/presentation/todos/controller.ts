import type { Request, Response } from "express"
import { prisma } from "../../config/lib/prisma"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto"

export class TodosController {

    constructor() { }

    getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        return res.json(todos)
    }
    getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id!
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        (todo) ?
            res.json(todo) :
            res.status(404).json({ error: `TODO with id ${id} not found` })

    }

    createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo)
    }

    updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
            
        const todoUpdate = await prisma.todo.update({
            where: { id },
            data: updateTodoDto?.values!
        });

        res.json(todoUpdate)
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        await prisma.todo.delete({
            where: {
                id
            }
        })
        res.json(todo)
    }


}