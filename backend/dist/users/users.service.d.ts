import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        password: string;
        username: string;
        about: string;
        avatar: string;
        email: string;
    } & User>;
    findOne(id: number): Promise<User>;
    updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User>;
    getUserWishes(username: string): Promise<User[]>;
    findUser(query: string): Promise<User>;
}
