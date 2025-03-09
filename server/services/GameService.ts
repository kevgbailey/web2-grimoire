import { GameRoles, RoleCategories } from '../models/roles';

export class GameService {
    private gameRoles: GameRoles;
    
    constructor() {
        this.gameRoles = GameRoles.getInstance();
    }

    public async getRoles(): Promise<RoleCategories> {
        return this.gameRoles.getAllRoles();
    }
}