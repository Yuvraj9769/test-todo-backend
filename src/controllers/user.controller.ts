import { Request, Response } from "express";
import userModel from "../models/user.model"
import { IUser } from "../types/user.types";
import bcrypt from "bcryptjs";
import generateJwtToken from "../utils/generateJwtToken";
import ApiResponse from "../utils/ApiResponse";

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { username, email, password } = req.body;

        if ([username, email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"))
        }

        const isUserExits: IUser | null = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserExits) {
            if (username === isUserExits.username && email === isUserExits.email) {
                return res.status(400).json(new ApiResponse(400, "Username and email already exist."))
            }

            if (email === isUserExits.email) {
                return res.status(400).json(new ApiResponse(400, "User email already exists."))
            }

            if (username === isUserExits.username) {
                return res.status(400).json(new ApiResponse(400, "Username already exists."))
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(201).json(new ApiResponse(201, "User created successfully."));

    }
    catch (error: any) {
        console.log("User registration failed: ", error?.message)

        return res.status(500).json(new ApiResponse(500, "User registration failed"))

    }
}

export const loginUser = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;


        if ([email, password].some(field => field?.trim() === "")) {
            return res.status(400).json(new ApiResponse(
                400,
                "All fields are required"
            ))
        }

        const isUserExists = await userModel.findOne({
            email
        })


        if (!isUserExists) {
            return res.status(404).json(new ApiResponse(
                404,
                "User does not exist. Please signup first."
            ))
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExists?.password);


        if (!isPasswordMatched) {
            return res.status(401).json(new ApiResponse(
                401,
                "Invalid password"
            ))
        }


        const options = {
            httpOnly: true,
            // secure: true,
            secure: false, // localhost
            sameSite: "strict" as const,
            expires:
                new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )
        }

        const jwtToken = generateJwtToken(isUserExists?.id);


        res.cookie("auth_user", jwtToken, options);



        return res.status(200).json(new ApiResponse(
            200,
            "User logged in successfully.",
            {
                userId: isUserExists?._id
            }
        ))


    }
    catch (error: any) {
        console.log("User login failed: ", error?.message);

        return res.status(500).json(new ApiResponse(
            500,
            "User login failed"
        ))
    }

}


export const logoutUser = async (req: Request, res: Response) => {
    try {

        const reqUser = req?.user;

        if (!reqUser || reqUser?.email) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized user."))
        }

        const dbUser = await userModel.findOne({
            email: reqUser?.email
        })

        if (!dbUser) {
            return res.status(404).json(
                new ApiResponse(404, "User does not exist.")
            )
        }

        const options = {
            httpOnly: true,
            // secure: true,
            secure: false, // localhost
            sameSite: "strict" as const,
        }

        res.clearCookie("auth_user", options);

        return res.status(200).json(new ApiResponse(200, "User logged out successfully."))

    }
    catch (error: any) {
        console.log("User logout failed: ", error?.message);
        return res.status(500).json(new ApiResponse(500, "User logout failed"))
    }
}


export const getCurrentUserAuthData = async (req: Request, res: Response) => {
    try {

        const reqUser = req?.user;


        if (!reqUser || !reqUser?.email) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized user."))
        }

        const dbUser = await userModel.findOne({
            email: reqUser?.email
        })
            .select("username email")

        if (!dbUser) {
            return res.status(404).json(
                new ApiResponse(404, "User does not exist.")
            )
        }

        return res.status(200).json(new ApiResponse(200, "User data fetched successfully",
            { user: dbUser }
        ))

    }
    catch (error: any) {
        console.log("Failed to fetch current user auth data: ", error?.message);
        return res.status(500).json(new ApiResponse(500, "Failed to fetch current user auth data"))
    }
}