import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { UserDTO } from '../DTOs/userDTO';
import { Users, UsersDocument } from '../schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
        @InjectConnection() private connection: Connection,
    ) { }

    async logIn(userDTO: UserDTO): Promise<{ success: boolean}> {
        const { email, password } = userDTO;

        const user = await this.UsersModel.findOne({ email });

        if(!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }
        
        const isTruePw = await bcrypt.compare(password, user.password);

        if (!isTruePw) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        // TODO: Generate a JWT and return it here
        // instead of the user object
        return { success: true };
    }
}
