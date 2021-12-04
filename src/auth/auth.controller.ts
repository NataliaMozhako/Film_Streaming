import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/login')
    login(@Body() loginDto: CreateUserDto) {
        return this.authService.login(loginDto)
    }
      
    @Post('/registration')
    registration(@Body() createUserDto: CreateUserDto, @Body() createProfileDto: CreateProfileDto){
        return this.authService.registration(createUserDto, createProfileDto)
    }
}
