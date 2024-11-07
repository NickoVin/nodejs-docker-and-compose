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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("./entities/offer.entity");
let OffersService = class OffersService {
    constructor(offerRepository, userRepository, wishRepository) {
        this.offerRepository = offerRepository;
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
    }
    async create(createOfferDto, userId) {
        const { amount, itemId } = createOfferDto;
        const owner = await this.userRepository.findOneBy({ id: userId });
        const wish = await this.wishRepository.findOne({
            where: { id: itemId },
            relations: ['owner', 'offers'],
        });
        if (userId === wish.owner.id) {
            throw new common_1.ForbiddenException('Вы не можете скидываться на свой подарок');
        }
        const raised = +wish.raised + amount;
        if (raised > wish.price) {
            throw new common_1.BadRequestException('Сумма заявки больше');
        }
        wish.raised += amount;
        await this.wishRepository.update(itemId, { raised: raised });
        return this.offerRepository.save(Object.assign(Object.assign({}, createOfferDto), { owner: owner, item: wish }));
    }
    findAll() {
        return this.offerRepository.find({
            relations: {
                user: true,
                item: true,
            },
        });
    }
    findOne(id) {
        return this.offerRepository.findOneBy({ id });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map