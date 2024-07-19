export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const tweetId = getRouterParam(event, 'id')
    const query = getQuery(event)
  
    if (tweetId == undefined || query == undefined) {
      return {
        success: false,
        message: 'Need page number and id'
      }
    }
  
    const page = query.page as number
  
    if (page < 0) {
      return {
        success: false,
        message: 'Wrong page number'
      }
    }
    const limit = 20
    const offset = (page - 1) * limit
  
    try {
      const result = await db.sql`SELECT COUNT(*) AS total FROM Comments WHERE tweet_id = ${tweetId}`
      if (result.rows === undefined) {
        throw new Error('Failed to retrieve tweet count')
      }
      const total = result.rows[0].total as number
      const maxPages = Math.ceil(total / limit);
  
      const { rows } =
        await db.sql`SELECT * FROM Comments WHERE tweet_id = ${tweetId} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
  
      if (rows === undefined) {
        throw new Error('Query returned undefined')
      }
  
      return {
        success: true,
        data: rows,
        maxPages: maxPages
      }
    } catch (error) {
      console.error('Database error:', error)
      return {
        success: false,
        message: 'Failed to fetch Comments'
      }
    }
  })
  