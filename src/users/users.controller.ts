import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDTO } from '../DTOs/userDTO';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body() userDTO: UserDTO) { 
        return this.usersService.register(userDTO);  // Gọi phương thức create với đối tượng DTO
    }
}