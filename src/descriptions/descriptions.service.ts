import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description, DescriptionDocument } from './schema/description.schema';

@Injectable()
export class DescriptionsService {

    constructor(@InjectModel(Description.name) private descriptionModel: Model<DescriptionDocument>){}


    async getAll(): Promise<Description[]>{
      return this.descriptionModel.find().exec();
    }

    async getById(id: string): Promise<Description> {
      return this.descriptionModel.findById(id)
    }
      
    async create(descriptionDto: CreateDescriptionDto): Promise<Description> {
      const newDescription= new this.descriptionModel(descriptionDto) 
      return newDescription.save()
    }
    
    async remove(id: string): Promise<Description> {
        return this.descriptionModel.findByIdAndRemove(id)
    }
    
    async update(id: string, descriptionDto: UpdateDescriptionDto): Promise<Description> {
        return this.descriptionModel.findByIdAndUpdate(id, descriptionDto, {new: true})
    }
}
