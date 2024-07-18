import { IncomingForm } from 'formidable'
import { mkdirSync, renameSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const tweetId = getRouterParam(event, 'id')
  const form = new IncomingForm({ multiples: true }) // Allow multiple files

  if (tweetId == undefined) {
    throw createError({
      statusCode: 401,
      message: 'Need tweet id'
    })
  }

  const uploadDir = join(process.cwd(), 'public', 'media', tweetId)
  mkdirSync(uploadDir, { recursive: true })

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        return reject(err)
      }

      if (!files.file || !files.file.length) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid file'
        })
      }

      const db = useDatabase()
      const fileArray = Array.isArray(files.file) ? files.file : [files.file]
      let data = []

      for (const f of fileArray) {
        if (f.originalFilename == null) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid filename'
          })
        }

        const filePath = join(uploadDir, f.originalFilename)
        renameSync(f.filepath, filePath)
        await db.sql`INSERT INTO Media (tweet_id, media_url, media_type) VALUES (${tweetId}, ${'/media/'+ tweetId + '/' + f.originalFilename}, ${'image'})`
        data.push(`/media/${tweetId}/${f.originalFilename}`)
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          tweetId,
          filePath: data
        })
      })
    })
  })
})
