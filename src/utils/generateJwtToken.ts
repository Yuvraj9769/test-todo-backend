import jwt, {
    Secret,
    SignOptions
} from "jsonwebtoken";

const generateJwtToken = (userId: string) => {

    if (!userId) {
        throw new Error("User ID is required to generate JWT token.");
    }

    return jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET_KEY as Secret,
        {
            expiresIn: process.env.JWT_EXPIRY as string
        } as SignOptions
    )
}

export default generateJwtToken;