import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(createWishDto: CreateWishDto, req: any): Promise<{
        owner: import("../users/entities/user.entity").User;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & import("./entities/wish.entity").Wish>;
    getLastWishes(): Promise<import("./entities/wish.entity").Wish[]>;
    getTopWishes(): Promise<import("./entities/wish.entity").Wish[]>;
    getOneWish(id: number): Promise<import("./entities/wish.entity").Wish>;
    update(id: number, updateWishDto: UpdateWishDto, req: any): Promise<{
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        raised: number;
        owner: import("../users/entities/user.entity").User;
        offers: import("../offers/entities/offer.entity").Offer[];
        copied: number;
        wishlist: import("../wishlists/entities/wishlist.entity").Wishlist[];
    } & import("./entities/wish.entity").Wish>;
    copy(id: number, req: any): Promise<import("./entities/wish.entity").Wish>;
    remove(id: number, req: any): Promise<import("./entities/wish.entity").Wish>;
}
