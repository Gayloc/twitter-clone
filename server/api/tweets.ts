export default defineEventHandler(async () => {
  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM Tweets ORDER BY created_at DESC LIMIT 10`;

  return {
    data: rows
  }
})
