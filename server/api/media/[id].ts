// Define the API endpoint
export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const tweetId = getRouterParam(event, 'id');

    try {
        // Query to get tweet and media data
        const tweetQuery = await db.sql`
            SELECT 
                t.tweet_id, 
                t.user_id, 
                t.content, 
                t.created_at, 
                u.username, 
                m.media_id, 
                m.media_url, 
                m.media_type 
            FROM 
                Tweets t
            JOIN 
                Users u ON t.user_id = u.user_id
            LEFT JOIN 
                Media m ON t.tweet_id = m.tweet_id
            WHERE 
                t.tweet_id = ${tweetId}`;

        const rows = tweetQuery.rows;

        if (rows === undefined) {
            throw new Error('Query returned undefined');
          }

        if (rows.length === 0) {
            return {
                success: false,
                message: 'Tweet not found'
            };
        }

        const tweet = {
            tweet_id: rows[0].tweet_id,
            user_id: rows[0].user_id,
            username: rows[0].username,
            content: rows[0].content,
            created_at: rows[0].created_at,
            media: rows.map(row => ({
                media_id: row.media_id,
                media_url: row.media_url,
                media_type: row.media_type
            })).filter(media => media.media_id !== null)
        };

        return {
            success: true,
            data: tweet
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            message: 'Failed to fetch tweet data'
        };
    }
});
