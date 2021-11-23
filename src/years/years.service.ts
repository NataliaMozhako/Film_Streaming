import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { Year, YearDocument } from './schema/year.schema';

@Injectable()
export class YearsService {

    constructor(@InjectModel(Year.name) private yearModel: Model<YearDocument>){}


    async getAll(): Promise<Year[]>{
      return this.yearModel.find().exec();
    }

    async getById(id: string): Promise<Year> {
      return this.yearModel.findById(id)
    }
      
    async create(yearDto: CreateYearDto): Promise<Year> {
      const newYear= new this.yearModel(yearDto) 
      return newYear.save()
    }
    
    async remove(id: string): Promise<Year> {
        return this.yearModel.findByIdAndRemove(id)
    }
    
    async update(id: string, yearDto: UpdateYearDto): Promise<Year> {
        return this.yearModel.findByIdAndUpdate(id, yearDto, {new: true})
    }
}
