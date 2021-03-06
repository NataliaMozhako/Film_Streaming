import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/schema/profile.schema';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly roleService: RolesService,
    private readonly profileService: ProfilesService,
    private readonly jwtService: JwtService
  ) { }

  async getAll(): Promise<User[]> {
    return this.userModel.find().populate('role').exec();
  }

  async getById(id: string)/*: Promise<User> */{
    return await this.userModel.findById(id).populate('profile').populate('role')
  }

  async create(userDto: CreateUserDto, profileDto: CreateProfileDto): Promise<User> {
    const newUser = new this.userModel(userDto)
    const newProfile = await this.profileService.create(profileDto)
    const stripe = require('stripe')('sk_test_51K40fNBuLEUf0D1XNtEGfsZNXbeHniWmCsTPno7aG7JMmt3ArNQhJK4JwjyzMzFcFk2PAfNKhxzmnwQTZdk0w7Ht00cxM5BRgD');
    const customer = await stripe.customers.create({name: newUser.username, email: newUser.email})
    newProfile.stripeId = customer.id
    newProfile.save()
    const role = await this.roleService.getRoleByTitle("Registered User")
    newUser.profile = newProfile._id
    newUser.role = role._id
    role.user.push(newUser._id)
    role.save()
    newUser.blocked = false
    return newUser.save()
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id)
    const profile = await this.profileService.getById(user.profile.toString())
    const role = await this.roleService.getById(user.role.toString())
    this.removeProfile(profile._id)
    const indexRole = role.user.indexOf(user._id, 0)
    if (indexRole > -1) {
      role.user.splice(indexRole, 1);
    }
    role.save()
    return this.userModel.findByIdAndRemove(id)
  }

  async removeProfile(id: string): Promise<Profile> {
    return this.profileService.remove(id)
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ 'email': email })
    return user
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ 'username': username })
    return user
  }

  // async addRole(updateUserRoleDto: UpdateUserRoleDto, id: string) {
  //   const user = await this.userModel.findById(id)
  //   const role1 = await this.roleService.getById(user.role.toString())
  //   const role2 = await this.roleService.getById(updateUserRoleDto.role)
  //   if (user && role2) {
  //     user.role = role2._id
  //     role2.user.push(user._id)
  //     role2.save()
  //     const indexRole = role1.user.indexOf(user._id, 0)
  //     if (indexRole > -1) {
  //       role1.user.splice(indexRole, 1);
  //     }
  //     role1.save()
  //     return user.save()
  //   }
  //   throw new HttpException('???????????????????????? ?????? ???????? ???? ??????????????', HttpStatus.NOT_FOUND)
  // }

  async banUser(id: string) {
    const user = await this.userModel.findById(id)
    if (user) {
      if (user.blocked) {
        user.blocked = false
      }
      else {
        user.blocked = true
      }
      return user.save()
    }
    throw new HttpException('???????????????????????? ???? ????????????', HttpStatus.NOT_FOUND)
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto){
    if(updatePasswordDto.oldPassword !== updatePasswordDto.newPassword){
      const user = await this.userModel.findById(id)
      console.log(user)
      const passwordEquals = await bcrypt.compare(updatePasswordDto.oldPassword, user.password)
      console.log(passwordEquals)
      if(passwordEquals){
        const hashPassword = await bcrypt.hash(updatePasswordDto.newPassword, 5)
        user.password = hashPassword
        return user.save()
      }
      throw new UnauthorizedException({message: '?????????????? ???????????? ????????????'})
    }
    throw new UnauthorizedException({message: 'The entered old password don`t match the valid old password!'})
  }

  async updateRole(id: string){
    const user = await this.userModel.findById(id)
    const role1 = await this.roleService.getById(user.role.toString())
    const role2 = await this.roleService.getRoleByTitle("Client")
    if (user && role2) {
      user.role = role2._id
      role2.user.push(user._id)
      role2.save()
      const indexRole = role1.user.indexOf(user._id, 0)
      if (indexRole > -1) {
        role1.user.splice(indexRole, 1);
      }
      role1.save()
      user.save()
      return this.generateToken(user)
    }
    throw new HttpException('???????????????????????? ?????? ???????? ???? ??????????????', HttpStatus.NOT_FOUND)
  }

  async generateToken(user: User){
    const payload = {email: user.email, id: user._id, role: user.role}
    return{
        token: this.jwtService.sign(payload)
    }
}
}
