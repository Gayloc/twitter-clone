import { IncomingForm } from 'formidable'
import { mkdirSync, renameSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({ multiples: false })
  const userId = getRouterParam(event, 'id')

  const uploadDir = join(process.cwd(), 'public', 'avatars')
  mkdirSync(uploadDir, { recursive: true })

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        return reject(err)
      }

      if (files.file == undefined) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid file'
        })
      }

      const db = useDatabase()
      const file = files.file[0]

      if (file.originalFilename == null) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid filename'
        })
      }

      const newFilename = `${userId}${file.originalFilename.slice(file.originalFilename.lastIndexOf('.'))}`
      const filePath = join(uploadDir, newFilename)
      renameSync(file.filepath, filePath)
      await db.sql`UPDATE Avatar SET avatar_url = ${"/avatars/"+newFilename} WHERE user_id = ${userId}`

      resolve({ 
        statusCode: 200,
        body: JSON.stringify({
          userId, filePath: `/avatars/${newFilename}`
        })
       })
    })
  })
})
