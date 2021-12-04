import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: CreateUserDto) {
        const user = await this.validateUser(loginDto)
        return this.generateToken(user)
    }
    
    private async validateUser(loginDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password)
        if(user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Неверно введен email или пароль'})
    }

    async registration(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {
        const candidate = await this.userService.getUserByEmail(createUserDto.email)
        if (candidate) {
            throw new  HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(createUserDto.password, 5)
        const user = await this.userService.create({...createUserDto, password: hashPassword}, createProfileDto)
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user._id, role: user.role}
        return{
            token: this.jwtService.sign(payload)
        }
    }
}
