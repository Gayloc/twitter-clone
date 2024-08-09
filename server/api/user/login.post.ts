import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 请求体
interface loginBody {
  email: string;
  password: string;
}

// 数据库中的用户信息
interface user {
    id: number;
    email: string;
    user_name: string;
    avatar: string;
    password: string;
    age: number;
}

// 数据库查询结果
interface userRows { 
    rows: user[]; 
}

// 登录事件处理器
const runtimeConfig = useRuntimeConfig();

// JWT 密钥
const JWT_SECRET = runtimeConfig.jwtSecret;

export default defineEventHandler(async (event) => {
    // 读取请求体
    const body = await readBody<loginBody>(event);

    // 结构请求体
    const { email, password } = body;

    // 密码邮箱不为空
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        });
    }

    const db = useDatabase();

    // 查询用户
    const user = await db.sql<userRows>`SELECT * FROM users WHERE email = ${email};`;

    // 用户不存在
    if (user.rows.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email or password'
        });
    }

    // 验证密码
    const foundUser = user.rows[0];
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email or password'
        });
    }

    // 生成 JWT
    const token = jwt
        .sign(
            { userId: foundUser.id, userName: foundUser.user_name },
            JWT_SECRET,
            { expiresIn: '180d' }
    );
    
    // 设置 cookie
    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 180 // 180 days
    });

    // 返回结果
    return {
        success: true,
        message: 'Login successful',
        token
    };
});