import { Module } from '@nestjs/common';
import { WishlistService } from './wishlists.service';
import { WishlistController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Wish])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
