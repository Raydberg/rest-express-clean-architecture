import type { Request, Response } from "express"

const todos = [
    { id: 1, text: "Buy milk", completedAt: new Date() },
    { id: 2, text: "Buy brear", completedAt: new Date() },
    { id: 3, text: "Buy meat", completedAt: null },
    { id: 4, text: "Buy beef", completedAt: new Date() },
]

export class TodosController {

    constructor() { }

    getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }
    getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id!
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = todos.find(todo => todo.id === id);
        (todo) ?
            res.json(todo) :
            res.status(404).json({ error: `TODO with id ${id} not found` })

    }

    createTodo = (req: Request, res: Response) => {
        // const todo = req.body
        const { text, completedAt } = req.body
        if (!text) return res.status(400).json({ error: "Text is property requited" })

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt
        }

        todos.push(newTodo)
        res.json(todos)
    }

    updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id!
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        const { text, completedAt } = req.body
        if (!text) return res.status(400).json({ error: "Text is property requited" })

        todo.text = text || todo.text;


        (completedAt === null) ?
            todo.completedAt = null :
            todo.completedAt = new Date(completedAt || todo.completedAt)


        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos[index] = todo
            }
        })
        res.json(todo)
    }

    deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id!
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        todos.splice(todos.indexOf(todo), 1)
        res.json(todo)
    }


}