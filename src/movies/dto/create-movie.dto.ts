import { ObjectId } from "mongoose";

export class CreateMovieDto {
  readonly title: string
  readonly movieLink: string
  readonly poster: string
  readonly yearId: ObjectId
  readonly genreId: ObjectId
  readonly descriptionId: ObjectId
}