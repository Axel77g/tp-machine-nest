
import * as crypto from 'node:crypto';
export interface Film{
    identifier: string;
    title: string
    userIdentifier: string;
}

export function createFilm(payload : {
    title: string,
    userIdentifier: string
}) : Film {
    return {
        identifier: crypto.randomUUID(),
        userIdentifier: payload.userIdentifier,
        title: payload.title,
    };
}