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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let WishlistService = class WishlistService {
    constructor(wishlistRepository, userRepository, wishRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
    }
    async create(createWishlistDto, userId) {
        const { itemsId } = createWishlistDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const wishes = [];
        try {
            itemsId.forEach(async (itemId) => {
                wishes.push(await this.wishRepository.findOneByOrFail({ id: itemId }));
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException('Данные не найдены');
        }
        return this.wishlistRepository.save(Object.assign(Object.assign({}, createWishlistDto), { owner: user, items: wishes }));
    }
    async findAll() {
        return await this.wishRepository.find();
    }
    async findOneWishlist(id) {
        return await this.wishlistRepository.findOne({
            relations: {
                items: true,
                owner: true,
            },
            where: {
                id: id,
            },
        });
    }
    async update(id, updateWishlistDto, userId) {
        const wishList = await this.wishlistRepository.findOne({
            relations: {
                owner: true,
            },
            where: {
                id: id,
                owner: { id: userId },
            },
        });
        return this.wishlistRepository.update(wishList, Object.assign({}, updateWishlistDto));
    }
    async remove(id, userId) {
        const wishList = await this.wishlistRepository.findOne({
            relations: {
                owner: true,
            },
            where: {
                id: id,
                owner: {
                    id: userId,
                },
            },
        });
        return await this.wishlistRepository.remove(wishList);
    }
};
WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlists.service.js.map