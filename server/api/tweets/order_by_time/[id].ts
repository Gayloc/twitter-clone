export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const pageParam = getRouterParam(event, 'id')

  if (pageParam == undefined) {
    return {
      success: false,
      message: 'Need page number'
    }
  }

  const page = parseInt(pageParam)

  if (page < 0) {
    return {
      success: false,
      message: 'Wrong page number'
    }
  }
  const limit = 20
  const offset = (page - 1) * limit

  try {
    const result = await db.sql`SELECT COUNT(*) AS total FROM Tweets`
    if (result.rows === undefined) {
      throw new Error('Failed to retrieve tweet count')
    }
    const total = result.rows[0].total as number
    const maxPages = Math.ceil(total / limit);

    const { rows } =
      await db.sql`SELECT * FROM Tweets ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`

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
      message: 'Failed to fetch tweet'
    }
  }
})
