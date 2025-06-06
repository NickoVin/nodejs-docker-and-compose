"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { password } = createUserDto;
        const passwordHash = await bcrypt.hash(password, 10);
        try {
            const user = await this.userRepository.save(Object.assign(Object.assign({}, createUserDto), { password: passwordHash }));
            delete user.password;
            return user;
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError) {
                const err = error.driverError;
                if (err.code === '23505') {
                    throw new common_1.ConflictException('username already exist');
                }
            }
        }
    }
    async findOne(id) {
        return await this.userRepository.findOneBy({ id: id });
    }
    async updateOne(id, updateUserDto) {
        for (const key in updateUserDto) {
            if (key === 'password') {
                const passwordHash = await bcrypt.hash(updateUserDto[key], 10);
                updateUserDto[key] = passwordHash;
            }
        }
        try {
            await this.userRepository.update(id, updateUserDto);
            const user = await this.userRepository.findOneBy({ id: id });
            return user;
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError) {
                const err = error.driverError;
                if (err.code === '23505') {
                    throw new common_1.ConflictException('username already exist');
                }
            }
        }
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({
            select: { id: true, password: true },
            where: { username: username },
        });
        return user;
    }
    async getUserWishes(username) {
        const userWishes = await this.userRepository.find({
            where: { username: username },
            relations: { wishes: true, offers: true },
        });
        return userWishes;
    }
    async findUser(query) {
        const searchField = query.includes('@') ? 'email' : 'username';
        return await this.userRepository.findOne({
            where: { [searchField]: query },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map