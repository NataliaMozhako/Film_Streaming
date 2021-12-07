import { IsInt, IsString } from "class-validator"

export class UpdateDescriptionDto{
    @IsString({ message: 'Должно быть строкой' })
    readonly backdrop: string
    @IsString({ message: 'Должно быть строкой' })
    readonly overview: string
    @IsString({ message: 'Должно быть строкой' })
    readonly actors: string
    @IsInt({ message: 'Должно быть числом' })
    readonly ageLimitation: number
    @IsInt({ message: 'Должно быть числом' })
    readonly rating: number
    @IsInt({ message: 'Должно быть числом' })
    readonly voteCount: number
}
