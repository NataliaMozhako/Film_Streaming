import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>){}


    async getAll(): Promise<Profile[]>{
      return this.profileModel.find().exec();
    }

    async getById(id: string): Promise<Profile> {
      return this.profileModel.findById(id)
    }
      
    async create(movieDto: CreateProfileDto): Promise<Profile> {
      const newMovie= new this.profileModel(movieDto) 
      return newMovie.save()
    }
    
    async remove(id: string): Promise<Profile> {
        return this.profileModel.findByIdAndRemove(id)
    }
    
    async update(id: string, userDto: UpdateProfileDto): Promise<Profile> {
        return this.profileModel.findByIdAndUpdate(id, userDto, {new: true})
    }
}
