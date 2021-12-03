import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from './dto/create-gener.dto';
import { UpdateGenreDto } from './dto/update-gener.dto';
import { Genre, GenreDocument } from './schema/genre.schema';

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre.name) private generModel: Model<GenreDocument>){}


    async getAll(): Promise<Genre[]>{
      return this.generModel.find().exec();
    }

    async getById(id: string)/*: Promise<Genre> */{
      return this.generModel.findById(id)
    }
      
    async create(genreDto: CreateGenreDto): Promise<Genre> {
      const newGener= new this.generModel(genreDto) 
      return newGener.save()
    }
    
    async remove(id: string): Promise<Genre> {
        return this.generModel.findByIdAndRemove(id)
    }
    
    async update(id: string, genreDto: UpdateGenreDto): Promise<Genre> {
        return this.generModel.findByIdAndUpdate(id, genreDto, {new: true})
    }
}
