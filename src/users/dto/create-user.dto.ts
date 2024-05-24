import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsEnum(["ad", "us"], {
        message: 'Valid role required'
    })
    role: "ad" | "us"
}