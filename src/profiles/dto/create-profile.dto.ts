import { IsInt } from "class-validator"
import { ObjectId } from "mongoose"

export class CreateProfileDto {
  @IsInt({ message: 'Должно быть числом' })
  readonly phoneNumber: number
  @IsInt({ message: 'Должно быть числом' })
  readonly age: number
  readonly userId: ObjectId
} 