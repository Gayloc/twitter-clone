// server/api/auth/register.ts

import { defineEventHandler, readBody, createError } from 'h3';
import bcrypt from 'bcrypt';

interface RegisterBody {
  username: string;
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

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event);
  const { username, email, password } = body;

  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields are required',
    });
  }

  const db = useDatabase();

  const existingUser = await db.sql<UserRows>`SELECT * FROM Users WHERE email = ${email} OR username = ${username}`

  if (existingUser.rows.length !== 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username or email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.sql`INSERT INTO Users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`

  return {
    success: true,
    message: 'User registered successfully',
  };
});
