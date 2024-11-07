import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        password: string;
        username: string;
        about: string;
        avatar: string;
        email: string;
    } & import("./entities/user.entity").User>;
    getCurrentUser(req: any): Promise<import("./entities/user.entity").User>;
    updateUser(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    findOne(username: string): Promise<import("./entities/user.entity").User>;
    getUserWishes(username: string): Promise<import("./entities/user.entity").User[]>;
    signup(createUserDto: CreateUserDto): Promise<{
        password: string;
        username: string;
        about: string;
        avatar: string;
        email: string;
    } & import("./entities/user.entity").User>;
    findUser(query: string): Promise<import("./entities/user.entity").User>;
}
