import { LoginDTO } from "./dto/login.dto";
import * as UserEntity from "../../entities/User"
import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "src/repository/user.repository";
import * as bcrypt from "bcryptjs";
import { RegisterDTO } from "./dto/register.dto";
import * as jwt from "jsonwebtoken";
import { EmailAlreadyExistsException, EmailNotVerifiedException, InvalidCredentialsException, UserNotFoundException } from "./auth.exception";
import { IMailService } from "src/services/mails/IMailService";

export interface LoginResponse {
    token: string;
    user: UserEntity.User;
}


export interface RegisterResponse {
    registered: boolean;
}

export class AuthService{

    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IMailService")
        private readonly mailService: IMailService
    ) {}
 
    async login(loginDTO: LoginDTO) : Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(loginDTO.email);
        if (!user) {
            throw new UserNotFoundException();
        }
        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        if (!user.emailVerifiedAt) {
            throw new EmailNotVerifiedException();
        }
        const token = jwt.sign({ identifier: user.identifier, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        return { token, user };
    }
    
    async register(registerDTO: RegisterDTO) : Promise<RegisterResponse> {
        const existingUser = await this.userRepository.findByEmail(registerDTO.email);
        if (existingUser) {
            throw new EmailAlreadyExistsException();
        }
        const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
        const user = UserEntity.createUser({
            ...registerDTO,
            password: hashedPassword
        });
        await this.userRepository.putUser(user);

        console.log("User registered:", user);
        const verificationToken = this.createVerificationToken(user);
        console.log("Verification token created:", verificationToken, this.mailService);
        await this.mailService.sendWelcomeVerificationEmail({
            email : user.email,
            identity : user.firstName + ' ' + user.lastName
        }, verificationToken);

        return { registered: true };
    }


    createVerificationToken(user: UserEntity.User): string {
        return jwt.sign({ identifier: user.identifier, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    }

    async verifyEmail(token: string): Promise<boolean> {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
            if(!payload || typeof payload !== 'object' || !('identifier' in payload) || !('email' in payload)) return false;
            const user = await this.userRepository.findByIdentifier({identifier: payload.identifier});
            if (!user) {
                throw new UnauthorizedException();
            }
            if(user.emailVerifiedAt) return false;
            const verifiedUser = UserEntity.verifyEmail(user);
            console.log("User verified:", verifiedUser);
            this.userRepository.putUser(verifiedUser);
            return !!payload;
        } catch (error) {
            console.error("Email verification failed:", error);
            return false;
        }
    }
}