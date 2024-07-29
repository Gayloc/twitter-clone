export default defineEventHandler(async () => {
    const db = useDatabase();
    // Query for users
    const { rows } = await db.sql`SELECT * FROM users`;
    return {
      rows
    };
  });