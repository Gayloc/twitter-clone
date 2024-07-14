// server/api/auth/user.ts

import { defineEventHandler } from 'h3';
import authMiddleware from '../../util/auth';

export default defineEventHandler(async (event) => {
  await authMiddleware(event); // Apply authentication middleware

  const user = event.context.auth;

  return {
    success: true,
    user,
  };
});
