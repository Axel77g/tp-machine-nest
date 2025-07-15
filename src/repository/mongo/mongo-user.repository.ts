import { User } from "src/entities/User";
import { IUserRepository, UserIdentifier } from "../user.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoUserRepository implements IUserRepository {

    constructor(
        @InjectModel('UserSchema') private readonly userModel: Model<User>
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).lean<User>().exec();
    }

    async findByIdentifier(identifier: UserIdentifier): Promise<User | null> {
        if (identifier.identifier) {
            const response =  this.userModel.findOne({
                identifier: identifier.identifier
            }).lean<User>().exec();
            return response;
        }
        return null;
    }

    async putUser(user: User): Promise<User> {

        const updated = await this.userModel.findOneAndUpdate(
            { email: user.email },
            user,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean<User>().exec();
        return updated;
    }
}