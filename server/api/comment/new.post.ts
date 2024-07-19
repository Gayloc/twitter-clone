import authMiddleware from '../../util/auth';

export default defineEventHandler(async (event) => {
    await authMiddleware(event)
    const userInfo = event.context.auth
    const db = useDatabase()
    const body = await readBody(event)

    if (!body['tweet_id'] || !body['content']) {
        return {
            success: false,
            message: 'Invalid input parameters'
        }
    }

    try {
        await db.sql`INSERT INTO Comments (tweet_id, user_id, content) VALUES (${body['tweet_id']}, ${userInfo.userId}, ${body['content']})`

        return {
            success: true,
            message: 'Comment created successfully'
        }
    } catch (error) {
        console.error('Database error:', error)
        return {
            success: false,
            message: 'Failed to create Comment'
        }
    }
})