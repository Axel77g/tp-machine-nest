import { Schema } from "mongoose";
import { Roles } from "../../entities/Roles";


export const UserSchema = new Schema({
    identifier: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerifiedAt: {
        type: Date,
        default: null,
    },
    '2faSecret': {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.USER,        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    films : [
        {
            identifier:{
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            userIdentifier: {
                type: String,
                required: true,
            },
        }
    ]
});

