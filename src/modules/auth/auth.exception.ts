import { UnauthorizedException } from "@nestjs/common";

export class AuthentificationException extends  UnauthorizedException {}

export class LoginAuthenticationException extends AuthentificationException {}

export class EmailNotVerifiedException extends LoginAuthenticationException{
    constructor() {
        super("Email not verified");
    }
}

export class InvalidCredentialsException extends LoginAuthenticationException {
    constructor() {
        super("Invalid credentials");
    }
}

export class UserNotFoundException extends LoginAuthenticationException {
    constructor() {
        super("User not found");
    }
}

export class RegisterException extends AuthentificationException {}

export class EmailAlreadyExistsException extends RegisterException {
    constructor() {
        super("Cannot register user");
    }
}