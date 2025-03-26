import express, { Application } from 'express';
import { GameController } from './controllers/GameController';
import { AuthController } from './controllers/AuthController';

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize controllers
const gameController = new GameController();
const authController = new AuthController();

// Use controller routes
app.use('/api/game', gameController.router);
app.use('/api/auth', authController.router);

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}`);
});