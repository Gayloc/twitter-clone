// id.delete.ts
import authMiddle from '~/server/utils/auth';
interface article {
    id: number;
    author_id: number;
    title: string;
    content: string;
    cover: string;
    cre_time: number;
    author_name: string;
}

interface articleList {
    rows: article[];
}

export default defineEventHandler(async () => {
    // 验证用户是否登录
    await authMiddle(useEvent());

    // 获取用户信息
    const userInfo = useEvent().context.auth;

    const user_id = userInfo.userId;

    const id = getRouterParam(useEvent(), 'id');

    const db = useDatabase();

    const article = await db.sql<articleList>`SELECT * FROM article WHERE id = ${id} AND author_id = ${user_id}`;

    if (article.rows.length === 0) {
        throw createError({
            statusCode: 404,
            message: 'Article not found'
        });
    }

    const count: number = await db.sql`DELETE FROM article WHERE id = ${id}`;

    if (count === 0) {
        throw createError({
            statusCode: 500,
            message: 'delete article failed'
        });
    }

    return {
        success: true,
        message: 'delete article success'
    };
});