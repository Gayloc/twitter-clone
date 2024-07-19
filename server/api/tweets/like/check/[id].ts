import authMiddleware from '../../../../util/auth';

export default defineEventHandler(async (event) => {
    await authMiddleware(event);
    const db = useDatabase();
    const tweetId = getRouterParam(event, 'id');
    const userInfo = event.context.auth

    if (tweetId == undefined) {
        return {
          success: false,
          message: 'Need ids'
        }
      }
  
    try {
        const {rows} = await db.sql`SELECT * FROM Likes WHERE user_id = ${userInfo.userId} AND tweet_id = ${tweetId}`;

        if (rows === undefined) {
            throw new Error('Query returned undefined');
          }

        if (rows.length > 0) {
            return {
                success: true,
                like: true
            };
        } else {
            return {
                success: true,
                like: false
            };
        }
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            message: 'Failed to Like'
        };
    }
  });
  