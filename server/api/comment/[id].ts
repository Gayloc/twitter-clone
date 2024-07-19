export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const commentId = getRouterParam(event, 'id');

    try {
        const { rows } = await db.sql`SELECT * FROM Comments WHERE comment_id = ${commentId}`;

        if (rows == undefined) {
            throw createError({
                statusCode: 401,
                message: 'Create fetch failed'
            })
        }

        if (rows.length == 0) {
            throw createError({
                statusCode: 401,
                message: 'Create fetch failed'
            })
        }

        return {
            success: true,
            data: rows[0]
        }
    } catch (error) {
        console.error('Database error:', error)
        return {
            success: false,
            message: 'Failed to fetch comment'
        }
    }
})