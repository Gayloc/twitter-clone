export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const tweetId = getRouterParam(event, 'id');

  try {
      const { rows } = await db.sql`SELECT * FROM Tweets WHERE tweet_id = ${tweetId}`;

      if (rows === undefined) {
        throw new Error('Query returned undefined');
      }
      
      if (rows.length === 0) {
          return {
              success: false,
              message: 'Tweet not found'
          };
      }

      return {
          success: true,
          data: rows[0]
      };
  } catch (error) {
      console.error('Database error:', error);
      return {
          success: false,
          message: 'Failed to fetch tweet'
      };
  }
});
