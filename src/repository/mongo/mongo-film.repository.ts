import { InjectModel } from "@nestjs/mongoose";
import { Film } from "src/entities/Film";
import { IFilmRepository } from "../film.repository";
import { Model } from "mongoose";
import { User } from "src/entities/User";
import { UserIdentifier } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoFilmRepository implements IFilmRepository {
    constructor(@InjectModel("UserSchema") private readonly userModel: Model<User>) {
    }

    async putFilm(film: Film): Promise<Film> {
        const user = await this.userModel.findOne({ identifier: film.userIdentifier });
        if (!user) {
            throw new Error("User not found");
        }

        (user as User).films.push(film);
        await user.save();

        return film;
    }

    async findByUserId(userIdentifier: UserIdentifier): Promise<Film[]> {
        const pipeline = [
            {
                $match:{ identifier: userIdentifier.identifier }
            },
            {
                $unwind: "$films"
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ "$films", { userIdentifier: "$identifier", userEmail: "$email" } ] } }
            },
            {
                $project: {
                    _id: 0,
                    identifier: 1,
                    title: 1,
                    userIdentifier: 1,
                    userEmail: 1
                }
            }
        ];
        const results = await this.userModel.aggregate(pipeline).exec();
        console.log("Results from MongoDB:", results);
        //@ts-expect-error
        return results.map((result) => ({
            title: result.title,
            identifier: result.identifier,
        }));
    }
}