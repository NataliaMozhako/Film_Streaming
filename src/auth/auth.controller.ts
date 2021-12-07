import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }
    
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() createUserDto: CreateUserDto, @Body() createProfileDto: CreateProfileDto){
        return this.authService.registration(createUserDto, createProfileDto)
    }
}
