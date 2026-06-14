import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import todoModel from "../models/todo.model";

export const getCurretUserTodos = async (req: Request, res: Response) => {
    try {

        const userId = req?.user?.id;

        if(!userId) {
            return res.status(400).json(new ApiResponse(400, "User ID is required."))
        }

        const todos = await todoModel.find({
            user: userId
        })

        console.log("Fetched user todos: ", todos);

        if(todos?.length === 0) {
            return res.status(200).json(new ApiResponse(200, "No todos found for the user.", []))
        }

        return res.status(200).json(new ApiResponse(200, "User todos fetched successfully.", todos))

    }
    catch (error: any) {
        console.log("Error fetching user todos: ", error?.message);
        return res.status(500).json(new ApiResponse(500, "Error fetching user todos"))
    }
}