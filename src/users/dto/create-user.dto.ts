import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
//DTO -> Objetos de transferencia de datos -> esquemas
 
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