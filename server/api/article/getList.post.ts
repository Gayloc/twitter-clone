
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
        const articles = await db.sql<articleList>`SELECT * FROM article ORDER BY cre_time DESC LIMIT ${body.pageSize} OFFSET ${(body.page - 1) * body.pageSize}`;
        if (articles.rows.length === 0) {
            throw createError({
                statusCode: 404,
                message: '文章列表为空'
            });
        }
        return {
            success: true,
            articles: articles
        };
}); 