import { User } from "src/entities/User";
import { MongoUserRepository } from "./mongo/mongo-user.repository";


export interface UserIdentifier {  
    identifier: string;
}

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByIdentifier(identifier: UserIdentifier): Promise<User | null>;
    putUser(user: User): Promise<User>;
}

export const UserRepositoryProvider = {
    provide : "IUserRepository",
    useClass: MongoUserRepository,
}