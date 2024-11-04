import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string
}

export const UsersSchema = SchemaFactory.createForClass(Users);