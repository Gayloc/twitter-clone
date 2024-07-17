// server/api/auth/user.ts

import { defineEventHandler } from 'h3';
import authMiddleware from '../../util/auth';

export default defineEventHandler(async (event) => {
  await authMiddleware(event); // Apply authentication middleware

  const userInfo = event.context.auth;
  const db = useDatabase();
  try {
    const { rows } = await db.sql`SELECT * FROM Users WHERE user_id = ${userInfo.userId}`;

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
      user: {
        user_id: rows[0].user_id,
        username: rows[0].username,
        email: rows[0].email,
        created_at: rows[0].created_at
      }
    };
  } catch (error) {
      console.error('Database error:', error);
      return {
          success: false,
          message: 'Failed to fetch user'
      };
  }

});
