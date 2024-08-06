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

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    const db = useDatabase();

    const article = await db.sql<articleList>`SELECT * FROM article WHERE id = ${id}`;

    if (article.rows.length === 0) {
        throw createError({
            statusCode: 404,
            message: 'Article not found'
        });
    }

    return {
        success: true,
        article: article.rows[0]
    };
});