import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PutFilmDto {
    @ApiProperty({ description: 'Titre du film' })
    @IsString()
    title: string;
}
