// server/api/auth/login.ts

import { defineEventHandler, readBody, createError, setCookie } from 'h3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginBody {
  email: string;
  password: string;
}

interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

interface UserRows {
  rows: User[]
}

const JWT_SECRET = 'twitterClone';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    });
  }

  const db = useDatabase();

  const user = await db.sql<UserRows>`SELECT * FROM Users WHERE email = ${email}`;

  if (user.rows.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email or password',
    });
  }

  const foundUser = user.rows[0];
  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email or password',
    });
  }

  const token = jwt.sign(
    { userId: foundUser.user_id, username: foundUser.username },
    JWT_SECRET,
    { expiresIn: '180d' }
  );

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 180 * 24 * 60 * 60,
  });

  return {
    success: true,
    message: 'Login successful',
    token,
  };
});
