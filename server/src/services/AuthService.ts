import { GameRoles, RoleCategories } from '../middleware/roles';
import AuthRepository from '../db/AuthRepository';
import * as fs from 'node:fs/promises';
import * as path from 'path';

export class AuthService {
    private userAuthPath: string;
    private authRepository: AuthRepository;
    
    constructor() {
        this.userAuthPath = path.resolve(__dirname, '../db/users.json');
        this.initializeUsersFile();
        this.authRepository = new AuthRepository();
    }

    private async initializeUsersFile(): Promise<void> {
        try {
            await fs.access(this.userAuthPath);
        } catch {
            // File doesn't exist, create directory and file
            await fs.mkdir(path.dirname(this.userAuthPath), { recursive: true });
            await fs.writeFile(this.userAuthPath, JSON.stringify([]));
        }
    }

    public async getAuthToken(username: string, password: string): Promise<string> {
        // Implement authentication logic here

        // Return a JWT token upon successful authentication
        return 'auth_token';
    }

    public async addUser(username: string, password: string): Promise<void> {
       this.authRepository.addUser(username, password);
    }

    private async getUsers(): Promise<any[]> {
        try {
            const data = await fs.readFile(this.userAuthPath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error("error reading file", error);
            return [];
        }
    }

    private async isUserExist(username: string): Promise<boolean> {
        // Implement logic to check if user exists
        try {
            const users = await this.getUsers();
            if(users.find((user: { username: string; }) => user.username === username)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error("error reading file", error);
            return false;
        }
    }
}