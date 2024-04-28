import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
    async findOne(username: string) {
        return await this.userModel.findOne({ email: username })
    }

    async addOne(username: string, pass: string){
        const password = await bcrypt.hash(pass, saltOrRounds);
        return await this.userModel.create({ email: username, password })
    }
}
