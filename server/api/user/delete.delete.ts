// delete.delete.ts
import authMiddle from '~/server/utils/auth';
import bcrypt from 'bcrypt';

// 删除用户请求体
interface deleteBody {
    password: string;
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

// 用户信息列表
interface userRows { 
    rows: user[]; 
}
export default defineEventHandler(async (event) => {
    // TODO 验证用户
    await authMiddle(event);

    // TODO 获取请求体
    const body = await readBody<deleteBody>(event);
    const { password } = body;

    // 获取用户信息
    const userInfo = event.context.auth;

    // 获取数据库连接
    const db = useDatabase();
    
    try {
        // TODO 密码不能为空
        if (!password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'password are required'
            });
        }

        // TODO 获取用户信息
        const user = await db.sql<userRows>`SELECT * FROM users WHERE id = ${userInfo.userId};`;

        // TODO 用户不存在
        if (user.rows.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'user not found'
            });
        }

        // 用户信息
        const foundUser = user.rows[0];

        // TODO 验证密码
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            throw createError({
                statusCode: 401,
                statusMessage: 'password is incorrect'
            });
        }

        // TODO 删除用户
        if (passwordMatch) {
            db.sql`DELETE FROM users WHERE id = ${foundUser.id};`;
            return {
                success: true,
                message: 'user deleted successfully'
            };
        }
    } catch (error) {
        // TODO 处理错误
        console.error(error);
        throw error;
    }
});