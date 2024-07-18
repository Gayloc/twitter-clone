// Define the API endpoint
export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const tweetId = getRouterParam(event, 'id');

    try {
        const { rows } = await db.sql`SELECT * FROM Media WHERE tweet_id = ${tweetId}`

        if (rows === undefined) {
            throw new Error('Query returned undefined');
          }

        return {
            success: true,
            data: rows
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            message: 'Failed to fetch media data'
        };
    }
});
