import { Document } from "mongoose";

export interface IUser
    extends Document {
    username: string;
    email: string;
    password: string;

    createdAt: Date;
    updatedAt: Date;
}

// Create user payload
export interface ICreateUser {
    username: string;
    email: string;
    password: string;
}

// Find user
export interface IFindUser {
    email?: string;
    username?: string;
    _id?: string;
}

// Update user
export interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
}

// Delete user
export interface IDeleteUser {
    _id: string;
}