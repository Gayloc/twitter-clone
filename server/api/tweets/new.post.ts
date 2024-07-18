import authMiddleware from '../../util/auth';

export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const body = await readBody(event)
    await authMiddleware(event);

    // 验证输入参数
    if (!body['user_id'] || !body['content']) {
        return {
            success: false,
            message: 'Invalid input parameters'
        }
    }

    const newTweet = {
        user_id: body['user_id'],
        content: body['content']
    }

    try {
        await db.sql`INSERT INTO Tweets (user_id, content) VALUES (${newTweet.user_id}, ${newTweet.content})`;
        const { rows } = await db.sql`SELECT * FROM Tweets WHERE user_id = ${newTweet.user_id} ORDER BY created_at DESC LIMIT 1`;
        if (rows == undefined) {
            throw createError({
                statusCode: 401,
                message: 'Create tweet failed'
            })
        }

        return {
            success: true,
            tweet_id: rows[0].tweet_id,
            message: 'Tweet created successfully'
        }
    } catch (error) {
        console.error('Database error:', error)
        return {
            success: false,
            message: 'Failed to create tweet'
        }
    }
})
