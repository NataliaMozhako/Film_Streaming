import { IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: "Некорректный email" })
    readonly email: string

    @IsString({ message: 'Должно быть строкой' })
    @Length(6, 16, { message: 'Не меньше 6 и не больше 16' })
    readonly password: string
}