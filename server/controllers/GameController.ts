import { Request, Response } from 'express';
import { GameService } from '../services/GameService';
import { RoleCategories } from '../models/roles';

export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    public getRoles(req: Request, res: Response): void {
        this.gameService.getRoles().then((roles: RoleCategories) => {
            res.json(roles);
        });
    }
}