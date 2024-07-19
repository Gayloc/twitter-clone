export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const tweetId = getRouterParam(event, 'id');

    try {
        const { rows } = await db.sql`SELECT * FROM Comments WHERE tweet_id = ${tweetId} ORDER BY created_at DESC LIMIT 20`;

        if (rows == undefined) {
            throw createError({
                statusCode: 401,
                message: 'Create fetch failed'
            })
        }

        return {
            success: true,
            data: rows
        }

    } catch (error) {
        console.error('Database error:', error)
        return {
            success: false,
            message: 'Failed to fetch comment'
        }
    }
})