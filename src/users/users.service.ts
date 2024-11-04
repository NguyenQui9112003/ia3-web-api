import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { UserDTO } from '../DTOs/userDTO';
import * as bcrypt from 'bcryptjs'

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
        @InjectConnection() private connection: Connection,
    ) { }

    async register(userDTO: UserDTO): Promise<Users> {
        const { email, password } = userDTO;
        
        const existingEmail = await this.UsersModel.findOne({ email }).exec();
        if(existingEmail) {
            throw new ConflictException ('Existed email.')
        }
        
        const hashed_pw = await bcrypt.hash(password, 7);

        const user = await this.UsersModel.create({
            email,
            password: hashed_pw
        })
        return user.save();
    }

    async findUser(userDTO: UserDTO): Promise<Users | undefined> {
        const { email } = userDTO;
        try {
            return this.UsersModel.findOne({ email }).exec();
        } catch (error) {
            console.error('Database query error:', error.message);
            throw new InternalServerErrorException('Database error. Please try again later.');
        }
    }
}


