import { IncomingForm } from 'formidable'
import { mkdirSync, renameSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const tweetId = getRouterParam(event, 'id')
  const form = new IncomingForm({ multiples: false })

  if (tweetId == undefined) {
    throw createError({
      statusCode: 401,
      message: 'Need tweet id'
    })
  }

  const uploadDir = join(process.cwd(), 'dynamic', 'media', tweetId)
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

      const filePath = join(uploadDir, file.originalFilename)
      renameSync(file.filepath, filePath)

      const runtimeConfig = useRuntimeConfig()
      await db.sql`INSERT INTO Media (tweet_id, media_url, media_type) VALUES (${tweetId}, ${`${runtimeConfig.image_server}/media/${tweetId}/${file.originalFilename}`}, ${'video'})`

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          tweetId,
          filePath: `/media/${tweetId}/${file.originalFilename}`
        })
      })
    })
  })
})
