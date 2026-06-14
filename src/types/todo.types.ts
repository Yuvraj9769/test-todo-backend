import { Document } from "mongoose";

export type TodoStatus =
    | "pending"
    | "in-progress"
    | "completed";

export interface ITodo
    extends Document {
    title: string;
    description: string;
    status: TodoStatus;
    user: string;

    createdAt: Date;
    updatedAt: Date;
}

// Create todo payload
export interface ICreateTodo {
    title: string;
    description?: string;
    status?: TodoStatus;
    user: string;
}

// Find todo
export interface IFindTodo {
    _id?: string;
    title?: string;
    status?: TodoStatus;
    user?: string;
}

// Update todo
export interface IUpdateTodo {
    title?: string;
    description?: string;
    status?: TodoStatus;
}

// Delete todo
export interface IDeleteTodo {
    _id: string;
}