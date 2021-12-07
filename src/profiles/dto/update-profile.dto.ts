import { IsInt } from "class-validator"

export class UpdateProfileDto {
  @IsInt({message: 'Должно быть числом'})
  readonly phoneNumber: number
} 