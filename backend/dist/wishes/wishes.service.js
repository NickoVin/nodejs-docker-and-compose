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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let WishesService = class WishesService {
    constructor(wishRepository, userRepository) {
        this.wishRepository = wishRepository;
        this.userRepository = userRepository;
    }
    async create(createWishDto, id) {
        const user = await this.userRepository.findOneBy({ id: id });
        return await this.wishRepository.save(Object.assign(Object.assign({}, createWishDto), { owner: user }));
    }
    async findLastWish() {
        return await this.wishRepository.find({
            relations: { owner: true },
            order: {
                createdAt: 'DESC',
            },
            take: 30,
        });
    }
    async findTopWish() {
        return await this.wishRepository.find({
            relations: { owner: true, offers: true },
            order: {
                copied: 'DESC',
            },
            take: 10,
        });
    }
    async findOne(id) {
        const wish = await this.wishRepository.findOne({
            relations: {
                offers: true,
                owner: true,
            },
            where: { id: id },
        });
        return wish;
    }
    async findOneWish(query) {
        return await this.wishRepository.findOneOrFail(query);
    }
    async update(id, updateWishDto, userId) {
        const { price } = updateWishDto;
        const wish = await this.wishRepository.findOne({
            where: { id: id },
            relations: ['owner'],
        });
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете редактировать чужие  подарки');
        }
        if (wish.raised > 0 && price) {
            throw new common_1.ConflictException('Сбор средств уже идет');
        }
        return this.wishRepository.save(Object.assign(Object.assign({}, wish), updateWishDto));
    }
    async copy(wishId, userId) {
        const wish = await this.wishRepository.findOneBy({ id: wishId });
        const owner = await this.userRepository.findOne({
            relations: {
                wishes: true,
            },
            where: {
                id: userId,
            },
        });
        const { copied } = wish, wishData = __rest(wish, ["copied"]);
        wish.copied = copied + 1;
        await this.wishRepository.save(wish);
        return this.wishRepository.create(Object.assign(Object.assign({}, wishData), { owner: owner }));
    }
    async remove(wishId, userId) {
        const wish = await this.wishRepository.findOne({
            relations: {
                owner: true,
            },
            where: {
                id: wishId,
            },
        });
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Нельзя удалять чужие подарки');
        }
        return this.wishRepository.remove(wish);
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map