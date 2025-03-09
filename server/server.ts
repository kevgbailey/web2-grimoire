import express, { Request, Response, Application } from 'express';
import { GameController } from './controllers/GameController';

const gameController = new GameController();

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, world!');
});

app.get('/roles', (req: Request, res: Response): void => {
    gameController.getRoles(req, res);
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}`);
});