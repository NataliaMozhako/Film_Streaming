import { ObjectId } from "mongoose"
// import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

  // @IsString({message: 'Должно быть строкой'})
  readonly username: string

  // @IsString({message: 'Должно быть строкой'})
  // @IsEmail({}, {message: "Некорректный email"})
  readonly email: string
  // @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
  readonly password: string

  readonly profileId: ObjectId
  readonly roleId: ObjectId
} 