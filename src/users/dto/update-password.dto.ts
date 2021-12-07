import { IsString, Length } from "class-validator"

export class UpdatePasswordDto {
  
    readonly oldPassword: string
    readonly newPassword: string
  } 