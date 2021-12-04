import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/schema/profile.schema';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly roleService: RolesService,
    private readonly profileService: ProfilesService) { }


  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return await this.userModel.findById(id).populate('profile').populate('role')
  }

  async create(userDto: CreateUserDto, profileDto: CreateProfileDto): Promise<User> {
    const newUser = new this.userModel(userDto)
    const newProfile = await this.profileService.create(profileDto)
    const role = await this.roleService.getById("61aa0ddca058b667e986e6df")
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
    if (indexRole > -1){
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

  async getUserByEmail(email: string){
    const user = await this.userModel.findOne({'email': email})
    console.log(user)
    return user
  }
}
