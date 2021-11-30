import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { Profile, ProfileDocument } from 'src/profiles/schema/profile.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>){}


    async getAll(): Promise<User[]>{
      return this.userModel.find().exec();
    }

    async getById(id: string): Promise<User> {
      return this.userModel.findById(id)
    }
      
    async create(userDto: CreateUserDto, profileDto: CreateProfileDto): Promise<User> {
      const newUser= new this.userModel(userDto) 
      const newProfile = new this.profileModel(profileDto)
      newProfile.save()
      newUser.profile = newProfile._id
      return newUser.save()
    }
    
    async remove(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id)
    }
    
    async update(id: string, userDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, {new: true})
    }
}
