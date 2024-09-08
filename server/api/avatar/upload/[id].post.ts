import { IncomingForm } from 'formidable'
import { mkdirSync, copyFileSync, unlinkSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({ multiples: false })
  const userId = getRouterParam(event, 'id')

  if (userId == undefined) {
    throw createError({
      statusCode: 401,
      message: 'Need user id'
    })
  }

  const uploadDir = join(process.cwd(), 'dynamic', 'avatars', userId)
  mkdirSync(uploadDir, { recursive: true })

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        return reject(err)
      }

      if (files.file == undefined) {
        return reject(createError({
          statusCode: 401,
          statusMessage: 'Invalid file'
        }))
      }

      const db = useDatabase()
      const file = files.file[0]

      if (file.originalFilename == null) {
        return reject(createError({
          statusCode: 401,
          statusMessage: 'Invalid filename'
        }))
      }

      const newFilename = `${userId}${file.originalFilename.slice(file.originalFilename.lastIndexOf('.'))}`
      const filePath = join(uploadDir, newFilename)

      // Copy file instead of renaming it, then delete the original
      try {
        copyFileSync(file.filepath, filePath)
        unlinkSync(file.filepath) // Delete the temporary file after copying
      } catch (copyError) {
        return reject(copyError)
      }

      const runtimeConfig = useRuntimeConfig()
      await db.sql`UPDATE Avatar SET avatar_url = ${`${runtimeConfig.image_server}/avatars/${userId}/${newFilename}`} WHERE user_id = ${userId}`

      resolve({
        statusCode: 200,
        data: {
          userId,
          filePath: `${runtimeConfig.image_server}/avatars/${userId}/${newFilename}`
        }
      })
    })
  })
})
