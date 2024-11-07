import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
export declare class OffersService {
    private offerRepository;
    private userRepository;
    private wishRepository;
    constructor(offerRepository: Repository<Offer>, userRepository: Repository<User>, wishRepository: Repository<Wish>);
    create(createOfferDto: CreateOfferDto, userId: number): Promise<{
        owner: User;
        item: Wish;
        amount: number;
        hidden: boolean;
        itemId: number;
    } & Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
}
