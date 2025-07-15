import { Film } from "src/entities/Film";
import { MongoFilmRepository } from "./mongo/mongo-film.repository";
import { UserIdentifier } from "./user.repository";

export interface IFilmRepository {
    findByUserId(userIdentifier : UserIdentifier): Promise<Film[]>;
    putFilm(film: Film): Promise<Film>;
    
}

export const FilmRepositoryProvider = {
    provide : 'IFilmRepository',
    useClass : MongoFilmRepository
}