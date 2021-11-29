import { ObjectId } from "mongoose"

export class CreateUserDto {
  readonly email: string
  readonly password: string
  readonly userId: ObjectId
} 