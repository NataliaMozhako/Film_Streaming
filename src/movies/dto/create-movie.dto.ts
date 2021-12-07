import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateMovieDto {
  @IsString({message: 'Должно быть строкой'})
  readonly title: string
  @IsString({message: 'Должно быть строкой'})
  readonly movieLink: string
  @IsString({message: 'Должно быть строкой'})
  readonly poster: string
  readonly yearId: ObjectId
  readonly genreId: ObjectId
  readonly descriptionId: ObjectId
}