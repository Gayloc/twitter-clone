import authMiddle from '~/server/utils/auth';

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

// 用户喜欢数据格式
interface userLike {
    user_id: number;
    like_id: number;
}

// 用户喜欢列表
interface userLikeList {
    rows: userLike[];
}

export default defineEventHandler(async (event) => { 
    // 验证用户是否登录
    await authMiddle(event);

    // 获取用户信息
    const userInfo = event.context.auth;

    // 获取数据库连接
    const db = useDatabase();

    try {

        // 获取用户信息
        const { rows: userInfos } =
            await db.sql<userRows>`SELECT * FROM users WHERE id = ${userInfo.userId}`;
        
        // 用户不存在
        if (userInfos === undefined) {
            throw new Error('User not found');
        }

        // 用户不存在
        if (userInfos.length === 0) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        // 获取用户喜欢列表
        const { rows: likes } =
            await db.sql<userLikeList>`SELECT * FROM user_like WHERE user_id = ${userInfo.userId}`;
        
        // 返回用户信息
        return {
            success: true,
            userIn: {
                id: userInfos[0].id,
                email: userInfos[0].email,
                userName: userInfos[0].user_name,
                avatar: userInfos[0].avatar,
                age: userInfos[0].age
            },
            likes: likes,
            message: 'User info retrieved successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error getting user info'
        };
    }
});