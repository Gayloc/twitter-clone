// server/middleware/auth.js
import { defineEventHandler } from 'h3';
import jwt from 'jsonwebtoken';

const runtimeConfig = useRuntimeConfig();
const JWT_SECRET = runtimeConfig.jwtSecret;

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token){
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    try {
        const decode =
            jwt.verify(token, JWT_SECRET) as { userId: string, username: string };
        event.context.auth = {
            userId: decode.userId,
            username: decode.username
        };
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Invalid token'
        });
    }
});