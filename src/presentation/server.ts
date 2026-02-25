import express, { Router, type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


interface Options {
    port: number,
    routes: Router
    public_path?: string
}

export class Server {

    private app = express()
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {

        const { port, public_path = "public", routes } = options
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }


    async start() {

        //* Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        //* Public folders
        this.app.use(express.static(this.publicPath))


        //* Routes
        this.app.use(this.routes)


        //* SPA
        this.app.use((req, res) => {
            console.log(req.url)
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Sever running on port ${this.port}`)
        })
    }
}