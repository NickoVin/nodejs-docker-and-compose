import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto, req: any): Promise<{
        owner: import("../users/entities/user.entity").User;
        item: import("../wishes/entities/wish.entity").Wish;
        amount: number;
        hidden: boolean;
        itemId: number;
    } & import("./entities/offer.entity").Offer>;
    findAll(): Promise<import("./entities/offer.entity").Offer[]>;
    findOne(id: number): Promise<import("./entities/offer.entity").Offer>;
}
