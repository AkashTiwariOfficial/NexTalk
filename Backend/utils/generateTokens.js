import jwt from "jsonwebtoken";

export const generateRefreshAndAccesTokens = (user) => {
    const tokenAccess = jwt.sign({
        id: user._id,
        fullName: user.fullName,
        username: user.username
    },
        process.env.ACCESS_JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_JWT_TOKEN_EXPIRY
        }
    );

    const tokenRefresh = jwt.sign({
        id: user._id,
    },
        process.env.REFRESH_JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_JWT_TOKEN_EXPIRY
        });

        return { tokenAccess, tokenRefresh }
}

