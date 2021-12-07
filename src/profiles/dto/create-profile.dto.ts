import { IsInt } from "class-validator"

export class CreateProfileDto {
  @IsInt({ message: 'Должно быть числом' })
  readonly phoneNumber: number
} 