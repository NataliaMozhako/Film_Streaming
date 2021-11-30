import { ObjectId } from "mongoose";

export class CreateCommentDto{
    readonly content: string
    readonly date: string
    readonly username: string
    readonly movieId: ObjectId;
    readonly userId: ObjectId;
}