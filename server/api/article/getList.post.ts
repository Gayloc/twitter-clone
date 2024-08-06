
interface article {
    id: number;
    title: string;
    cover: string;
}

interface articleList {
    rows: article[];
}

interface listBody {
    page: number;
    pageSize: number;
}

export default defineEventHandler(async (event) => {
    // 读取请求体
    const body = await readBody<listBody>(event);

    if (!body || !body.page || !body.pageSize) {
        throw createError({
            statusCode: 400,
            message: '参数错误'
        });
    }

    // 获取数据库连接
    const db = useDatabase();
    const articles = await db.sql<articleList>`SELECT id, title, cover FROM article ORDER BY cre_time DESC LIMIT ${body.pageSize} OFFSET ${(body.page - 1) * body.pageSize}`;
    const count = await db.sql`SELECT COUNT(*) as count FROM article`;
    if (count.rows === undefined || count.rows.length === 0) {
        throw createError({
            statusCode: 400,
            message: '获取失败'
        });
    }
    return {
        success: true,
        articles: articles,
        count: count.rows[0].count
    };
}); 