import { Film } from "./Film";
import { Roles } from "./Roles";
import * as crypto from 'crypto';

export interface User{
    identifier: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailVerifiedAt?: Date;
    '2faSecret'?: string;
    role: Roles;
    createdAt?: Date;
    films?: Film[];
    updatedAt?: Date;
}

export function createUser(payload : {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: Roles,
}) : User {
    return {
        identifier: crypto.randomUUID(),
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: payload.role || Roles.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        films: [],
    };
}

export function verifyEmail(user : User) : User{
    return {
        ...user,
        emailVerifiedAt: new Date()
    }
}