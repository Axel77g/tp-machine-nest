import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class LoginDTO {
    @ApiProperty({ example: 'user@example.com', description: 'Adresse e-mail' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    password: string;
}