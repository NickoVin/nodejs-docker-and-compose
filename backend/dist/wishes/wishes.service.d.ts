import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
export declare class WishesService {
    private wishRepository;
    private userRepository;
    constructor(wishRepository: Repository<Wish>, userRepository: Repository<User>);
    create(createWishDto: CreateWishDto, id: number): Promise<{
        owner: User;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & Wish>;
    findLastWish(): Promise<Wish[]>;
    findTopWish(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    findOneWish(query: FindOneOptions<Wish>): Promise<Wish>;
    update(id: number, updateWishDto: UpdateWishDto, userId: number): Promise<{
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        raised: number;
        owner: User;
        offers: import("../offers/entities/offer.entity").Offer[];
        copied: number;
        wishlist: import("../wishlists/entities/wishlist.entity").Wishlist[];
    } & Wish>;
    copy(wishId: number, userId: number): Promise<Wish>;
    remove(wishId: number, userId: number): Promise<Wish>;
}
