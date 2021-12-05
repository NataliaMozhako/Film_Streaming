import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  // @UseGuards(JwtAuthGuard)
  // @Roles("Administrator")
  // @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Body() createProfileDto: CreateProfileDto): Promise<User> {
    return this.usersService.create(createUserDto, createProfileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id)
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }

  @Put('/role/:id')
  addRole(@Body() updateUserRoleDto: UpdateUserRoleDto, @Param('id') id: string){
    return this.usersService.addRole(updateUserRoleDto, id)
  }

  @Get('/ban/:id')
  banUser(@Param('id') id: string){
    return this.usersService.banUser(id)
  }
}
