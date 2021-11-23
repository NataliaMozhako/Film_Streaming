import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { GenreSchema, Genre } from './schema/genre.schema';

@Module({
  providers: [GenresService],
  controllers: [GenresController],
  imports: [MongooseModule.forFeature([
    {name: Genre.name, schema: GenreSchema}
  ])]
})
export class GenresModule {}
