import { ObjectId } from "mongoose"

export class CreateProfileDto {
    readonly phoneNumber: number
    readonly age: number
    readonly userId: ObjectId
  } 