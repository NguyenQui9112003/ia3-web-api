import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users, UsersSchema } from '../schemas/users.schema';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule] // Xuất các modal đã đăng kí với MongooseModule để sử dụng ở các module khác
})
export class UsersModule {}
