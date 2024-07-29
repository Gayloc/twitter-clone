import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface loginBody {
  email: string;
  password: string;
}

interface user {
    id: number;
    email: string;
    user_name: string;
    avatar: string;
    password: string;
    age: number;
}

interface userRows { 
    rows: user[]; 
}

const runtimeConfig = useRuntimeConfig();
const JWT_SECRET = runtimeConfig.jwtSecret;

export default defineEventHandler(async (event) => {
    const body = await readBody<loginBody>(event);
    const { email, password } = body;
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        });
    }
    const db = useDatabase();
    const user = await db.sql<userRows>`SELECT * FROM users WHERE email = ${email};`;
    if (user.rows.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email or password'
        });
    }

    const foundUser = user.rows[0];
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email or password'
        });
    }

    const token = jwt
        .sign(
            { userId: foundUser.id, userName: foundUser.user_name },
            JWT_SECRET,
            { expiresIn: '180d' }
    );
    
    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 180 // 180 days
    });

    return {
        success: true,
        message: 'Login successful',
        token
    };
});