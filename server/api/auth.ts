// server/middleware/auth.js
import { defineEventHandler } from 'h3';
import jwt from 'jsonwebtoken';

const runtimeConfig = useRuntimeConfig();
const JWT_SECRET = runtimeConfig.jwtSecret;

export default defineEventHandler(async (event) => {
    if (event.req.url?.startsWith('/login')
        || event.req.url?.startsWith('/register')
        || event.req.url?.startsWith('/logout')) {
        return; // 跳过认证中间件
    }
    const token = getCookie(event, 'auth_token');
    console.log('token', token);

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