import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDTO {

    @ApiProperty({ example: 'Dupont', description: 'Nom de famille de l\'utilisateur' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'Jean', description: 'Prénom de l\'utilisateur' })
    @IsString()
    @IsNotEmpty()
    firstName: string;



    @ApiProperty({ example: 'user@example.com', description: 'Adresse e-mail' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'password123', description: 'Confirmation du mot de passe' })
    @IsString()
    @MinLength(6)
    confirmPassword: string;
    
}