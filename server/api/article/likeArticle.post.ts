import authMiddle from '~/server/utils/auth';

interface sendBody {
    articleId : number;
}

interface like {
    user_id: number;
    like_id: number;
}

interface likeList {
    rows: like[];
}
export default defineEventHandler(async (event) => {
    // 验证用户是否登录
    await authMiddle(event);

    // 获取用户信息
    const userInfo = event.context.auth;

    // 获取数据库连接
    const db = useDatabase();

    const body = await readBody<sendBody>(event);

    if (body.articleId === undefined) {
        return {
            success: false,
            message: '文章ID不能为空'
        };
    }

    const articleLike = await db.sql<likeList>`SELECT * FROM user_like WHERE user_id = ${userInfo.userId} AND like_id = ${body.articleId}`;
    if (articleLike.rows.length === 0) {
        await db.sql`INSERT INTO user_like (user_id, like_id) VALUES (${userInfo.userId}, ${body.articleId})`;
        return {
            success: true,
            message: '点赞成功'
        };
    } else {
        await db.sql`DELETE FROM user_like WHERE user_id = ${userInfo.userId} AND like_id = ${body.articleId}`;
        return {
            success: true,
            message: '取消点赞成功'
        };
    }
});