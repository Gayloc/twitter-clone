import authMiddleware from '../../../util/auth';

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
            await db.sql`DELETE FROM Likes WHERE user_id = ${userInfo.userId} AND tweet_id = ${tweetId}`
        } else {
            await db.sql`INSERT INTO Likes (user_id, tweet_id) VALUES (${userInfo.userId}, ${tweetId})`;
        }
  
        return {
            success: true,
            message: 'Like/Unlike successfully'
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            message: 'Failed to Like'
        };
    }
  });
  