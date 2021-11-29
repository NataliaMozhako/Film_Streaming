import { ObjectId } from "mongoose"

export class CreateProfileDto {
    readonly email: string
    readonly phoneNumber: number
    readonly age: number
    readonly userId: ObjectId
  } 