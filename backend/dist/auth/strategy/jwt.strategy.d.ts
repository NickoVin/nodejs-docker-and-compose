import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(jwtPayload: {
        sub: number;
    }): Promise<import("../../users/entities/user.entity").User>;
}
export {};
