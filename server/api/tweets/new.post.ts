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
        return {
            success: true,
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
