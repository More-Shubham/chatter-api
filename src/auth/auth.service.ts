import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            return { email: user.email, _id: user._id };
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string) {
        return await this.usersService.addOne(username, password)
    }
}
