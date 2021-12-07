import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateCommentDto {
    @IsString({ message: 'Должно быть строкой' })
    readonly content: string
    readonly date: string
    readonly username: string
    readonly movieId: ObjectId;
    readonly userId: ObjectId;
}