import { IsString } from "class-validator";

export class UpdateUserRoleDto {
  @IsString({message: 'Должно быть строкой'})
  readonly role: string
} 