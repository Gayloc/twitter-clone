// middleware/auth.ts

import { defineEventHandler, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'twitterClone';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, username: string };
    event.context.auth = {
      userId: decoded.userId,
      username: decoded.username,
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    });
  }
});
