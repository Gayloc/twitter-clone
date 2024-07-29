import authMiddle from '~/server/utils/auth';
import bcrypt from 'bcrypt';

interface deleteBody {
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
export default defineEventHandler(async (event) => {
    await authMiddle(event);
    const body = await readBody<deleteBody>(event);
    const { password } = body;

    const userInfo = event.context.auth;
    const db = useDatabase();
    
    try {
        if (!password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'password are required'
            });
        }
        const user = await db.sql<userRows>`SELECT * FROM users WHERE id = ${userInfo.userId};`;
        if (user.rows.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'user not found'
            });
        }
        const foundUser = user.rows[0];
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            throw createError({
                statusCode: 401,
                statusMessage: 'password is incorrect'
            });
        }
        if (passwordMatch) {
            db.sql`DELETE FROM users WHERE id = ${foundUser.id};`;
            return {
                success: true,
                message: 'user deleted successfully'
            };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});