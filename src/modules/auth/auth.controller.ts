import { Controller, Get, Post, Body, HttpStatus, HttpCode, Catch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LoginResponseDTO, RegisterResponseDTO, ErrorResponseDTO } from './dto/response.dto';
import { AuthService } from './auth.service';
import { AuthExceptionFilter } from './auth.exception-filter';

@ApiTags('Authentication')
@Controller('auth')
@Catch(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Connexion utilisateur', 
    description: 'Authentifie un utilisateur avec son email et mot de passe' 
  })
  @ApiBody({ 
    type: LoginDTO,
    description: 'Informations de connexion'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Connexion réussie',
    type: LoginResponseDTO
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Identifiants invalides',
    type: ErrorResponseDTO
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Utilisateur non trouvé',
    type: ErrorResponseDTO
  })
  login(@Body() loginDTO: LoginDTO) {
    return this.userService.login(loginDTO);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Inscription utilisateur', 
    description: 'Crée un nouveau compte utilisateur' 
  })
  @ApiBody({ 
    type: RegisterDTO,
    description: 'Informations d\'inscription'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Inscription réussie',
    type: RegisterResponseDTO
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email déjà utilisé',
    type: ErrorResponseDTO
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Données invalides',
    type: ErrorResponseDTO
  })
  register(@Body() registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }


  @Get("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Vérification de l\'email',
    description: 'Vérifie si l\'email de l\'utilisateur est vérifié'
  })
  @ApiResponse({
    status: 200,
    description: 'Email vérifié avec succès',
    type: LoginResponseDTO
  })
  @ApiResponse({
    status: 400,
    description: 'Email non vérifié',
    type: ErrorResponseDTO
  })
  async verifyEmail(@Query('t') token: string) {
    const isVerified = await this.userService.verifyEmail(token);
    if (!isVerified) {
      return { message: 'Email non vérifié' };
    }
    return { message: 'Email vérifié avec succès' };

  }



}
