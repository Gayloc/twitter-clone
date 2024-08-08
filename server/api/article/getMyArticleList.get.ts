import authMiddle from '~/server/utils/auth';

interface article {
    id: number;
    title: string;
    cover: string;
}

interface articleList {
    rows: article[];
}

export default defineEventHandler(async (event) => {
    // 验证用户是否登录
    await authMiddle(event);

    // 获取用户信息
    const userInfo = event.context.auth;

    // 获取数据库连接
    const db = useDatabase();
    
    const articles = await db.sql<articleList>`SELECT id, title, cover 
    FROM article
    WHERE author_id = ${userInfo.userId} 
    ORDER BY cre_time DESC`;

    const count = await db.sql`SELECT COUNT(*) as count FROM article`;
    if (count.rows === undefined) {
        throw createError({
            statusCode: 400,
            message: '获取失败'
        });
    }
    if (articles.rows.length === 0) {
        return {
            success: false,
            message: '文章列表为空',
            count: count.rows[0].count
        };
    }
    return {
        success: true,
        articles: articles,
        count: count.rows[0].count,
        message: '获取成功'
    };
}); 