import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../../entities/Roles';

export class UserResponseDTO {
    @ApiProperty({ description: 'Identifiant unique de l\'utilisateur' })
    identifier: string;
    
    @ApiProperty({ description: 'Prénom de l\'utilisateur' })
    firstName: string;
    
    @ApiProperty({ description: 'Nom de famille de l\'utilisateur' })
    lastName: string;
    
    @ApiProperty({ description: 'Adresse e-mail de l\'utilisateur' })
    email: string;
    
    @ApiProperty({ description: 'Date de vérification de l\'email', required: false })
    emailVerifiedAt?: Date;
    
    @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: Roles })
    role: Roles;
    
    @ApiProperty({ description: 'Date de création', required: false })
    createdAt?: Date;
    
    @ApiProperty({ description: 'Date de dernière mise à jour', required: false })
    updatedAt?: Date;
}

export class LoginResponseDTO {
    @ApiProperty({ description: 'Token JWT pour l\'authentification' })
    token: string;

    @ApiProperty({ description: 'Informations de l\'utilisateur connecté', type: UserResponseDTO })
    user: UserResponseDTO;
}

export class RegisterResponseDTO {
    @ApiProperty({ description: 'Indique si l\'inscription a réussi' })
    registered: boolean;
}

export class ErrorResponseDTO {
    @ApiProperty({ description: 'Message d\'erreur' })
    message: string;

    @ApiProperty({ description: 'Code de statut HTTP' })
    statusCode: number;

    @ApiProperty({ description: 'Horodatage de l\'erreur' })
    timestamp: string;

    @ApiProperty({ description: 'Chemin de la requête' })
    path: string;
}
