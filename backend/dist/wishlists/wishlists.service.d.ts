import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class WishlistService {
    private wishlistRepository;
    private userRepository;
    private wishRepository;
    constructor(wishlistRepository: Repository<Wishlist>, userRepository: Repository<User>, wishRepository: Repository<Wish>);
    create(createWishlistDto: CreateWishlistDto, userId: number): Promise<{
        owner: User;
        items: any[];
        name: string;
        image: string;
        itemsId: number[];
        description: string;
    } & Wishlist>;
    findAll(): Promise<Wish[]>;
    findOneWishlist(id: number): Promise<Wishlist>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<Wishlist>;
}
