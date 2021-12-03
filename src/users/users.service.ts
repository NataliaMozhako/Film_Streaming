import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { Profile, ProfileDocument } from 'src/profiles/schema/profile.schema';
import { Role, RoleDocument } from 'src/roles/schema/role.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
      @InjectModel(Role.name) private roleModel: Model<RoleDocument>){}


    async getAll(): Promise<User[]>{
      return this.userModel.find().exec();
    }

    async getById(id: string): Promise<User> {
      return await this.userModel.findById(id).populate('profile').populate('role')
    }
      
    async create(userDto: CreateUserDto, profileDto: CreateProfileDto): Promise<User> {
      const newUser = new this.userModel(userDto) 
      const newProfile = new this.profileModel(profileDto)
      const role = await this.roleModel.findById(userDto.roleId)
      newProfile.save()
      newUser.profile = newProfile._id
      newUser.role = role._id
      role.user.push(newUser._id)
      role.save()
      return newUser.save()
    }
    
    async remove(id: string): Promise<User> {
      const user = await this.userModel.findById(id) 
      const profile = await this.profileModel.findById(user.profile)
      const role = await this.roleModel.findById(user.role)
      this.removeProfile(profile._id)
      const indexRole = role.user.indexOf(user._id, 0);
      if (indexRole > -1) {
        role.user.splice(indexRole, 1);
      }
      role.save()
      return this.userModel.findByIdAndRemove(id)
    }
    
    async removeProfile(id: string): Promise<Profile> {
      return this.profileModel.findByIdAndRemove(id)
    }

    async update(id: string, userDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, {new: true})
    }
}
