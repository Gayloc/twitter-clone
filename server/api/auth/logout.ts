// server/api/auth/logout.ts

import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  setCookie(event, 'auth_token', '', {
    httpOnly: true,
    secure: false,
    maxAge: -1
  })

  return {
    success: true,
    message: 'Logout successful'
  }
})
