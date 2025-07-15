import { Controller, Get, Param, Inject, UseGuards, Req, UnauthorizedException, Post, Put, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Film,createFilm } from "src/entities/Film";
import { IFilmRepository } from "src/repository/film.repository";
import { AuthGuard } from "../auth/auth.guard";
import { PutFilmDto } from "./dto/putFilmDto";
import { Private } from "../auth/public.decorator";
import { Roles } from "src/entities/Roles";

@ApiTags('films')
@Controller('films')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class FilmController {
    constructor(
        @Inject('IFilmRepository')
        private readonly filmRepository: IFilmRepository
    ) {}


    @Get('users/:userIdentifier')
    @ApiOperation({ summary: 'Get films by user identifier' })
    @ApiParam({ name: 'userIdentifier', description: 'User identifier', type: 'string' })
    @ApiResponse({ status: 200, description: 'Films found successfully',  })
    @Private()
    async findByUserId(@Param('userIdentifier') userIdentifier: string, @Req() req: {token: {identifier : string, role: string}}): Promise<Film[]> {
        if (userIdentifier !== req.token.identifier || req.token.role === Roles.ADMIN) {
            throw new UnauthorizedException("You are not allowed to access this user's films.");
        }
        return this.filmRepository.findByUserId({identifier: userIdentifier});
    }

    @Put('users/:userIdentifier')
    @ApiOperation({ summary: 'Put film for user' })
    @ApiParam({ name: 'userIdentifier', description: 'User identifier', type: 'string' })
    @ApiResponse({ status: 200, description: 'Film updated successfully' })
    @Private()
    async putFilm(@Param('userIdentifier') userIdentifier: string, @Req() req: {token: {identifier : string, role: string}}, @Body() putFilmDTO : PutFilmDto): Promise<Film> {
        
        console.log(req.token,userIdentifier)
        if (userIdentifier !== req.token.identifier || req.token.role === Roles.ADMIN) {
            throw new UnauthorizedException("You are not allowed to access this user's films.");
        }
        const film = createFilm({title: putFilmDTO.title, userIdentifier});
        return this.filmRepository.putFilm(film);
    
    }
}