import { WishlistService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    create(createWishlistDto: CreateWishlistDto, req: any): Promise<{
        owner: import("../users/entities/user.entity").User;
        items: any[];
        name: string;
        image: string;
        itemsId: number[];
        description: string;
    } & import("./entities/wishlist.entity").Wishlist>;
    findAll(): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findOne(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
}
