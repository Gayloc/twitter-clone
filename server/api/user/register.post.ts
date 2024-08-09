import bcrypt from 'bcrypt';

// 注册请求体
interface registerBody {
    email: string,
    password: string,
}

// 用户信息
interface user {
    id: number;
    email: string;
    user_name: string;
    avatar: string;
    password: string;
    age: number;
}

// 用户信息数组
interface userRows { 
    rows: user[]; 
}

export default defineEventHandler(async (event) => { 
    // 读取请求体
    const body = await readBody<registerBody>(event);
    const { email, password } = body;

    // 验证邮箱密码是否为空
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        });
    }

    // 获取数据库连接
    const db = useDatabase();

    // 检查邮箱是否已注册
    const existingUser = 
        await db.sql<userRows>`SELECT * FROM users WHERE email = ${email}`;
    
    // 如果已注册，抛出错误
    if (existingUser.rows.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists'
        });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.sql`INSERT INTO users (email, user_name, password) VALUES (${email}, ${email}, ${hashedPassword})`;

    // 返回成功信息
    return {
        success: true,
        message: 'User created successfully'
    };
});