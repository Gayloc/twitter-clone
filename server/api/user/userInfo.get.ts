import authMiddle from '~/server/utils/auth';

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

interface userLike {
    user_id: number;
    like_id: number;
}

interface userLikeList {
    rows: userLike[];
}

export default defineEventHandler(async (event) => { 
    await authMiddle(event);

    const userInfo = event.context.auth;
    const db = useDatabase();

    try {
        const { rows: userInfos } =
            await db.sql<userRows>`SELECT * FROM users WHERE id = ${userInfo.userId}`;
        if (userInfos === undefined) {
            throw new Error('User not found');
        }
        if (userInfos.length === 0) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        const { rows: likes } =
            await db.sql<userLikeList>`SELECT * FROM user_like WHERE user_id = ${userInfo.userId}`;
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