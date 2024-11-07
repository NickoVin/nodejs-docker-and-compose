import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    signin(req: any): {
        access_token: string;
    };
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
