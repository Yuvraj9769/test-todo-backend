import {
    Request,
    Response, NextFunction
} from "express";
import ApiResponse from "../utils/ApiResponse";
import jwt, {
    Secret,
    JwtPayload
} from "jsonwebtoken";
import userModel from "../models/user.model";


const verifyUserAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.cookies?.auth_user;


        if (!token) {

            return res.status(401).json(new ApiResponse(
                401,
                "Unauthorized please login first."
            ))

        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as Secret);


        const user = await userModel.findById(
            (decodedToken as JwtPayload).userId
        )

        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User does not exist."))
        }

        req.user = {
            id: user?._id.toString(),
            email: user?.email
        }

        next();

    }
    catch (error: any) {
        console.log("token verification failed: ", error?.message);
        return res.status(500).json(new ApiResponse(500, "Token verification failed"))
    }

}


export default verifyUserAuth