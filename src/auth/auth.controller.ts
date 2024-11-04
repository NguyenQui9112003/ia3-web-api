import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/DTOs/userDTO';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDTO: UserDTO): Promise<{ success: boolean }> {
        return this.authService.logIn(userDTO);
    }
}
