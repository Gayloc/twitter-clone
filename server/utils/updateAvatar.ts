import { IncomingForm } from 'formidable';
import { join } from 'path';
import authMiddle from '~/server/utils/auth';
import { mkdirSync , renameSync } from 'fs';

export default defineEventHandler(async (event) => { 
    const form = new IncomingForm({ multiples: true });
    await authMiddle(event);
    const userInfo = event.context.auth;
    const db = useDatabase();
    if (!userInfo) {
        return {
            statusCode: 401,
            body: 'Unauthorized'
        };
    }
    const uploadDir = join(process.cwd(), 'public', 'avatars');
    mkdirSync(uploadDir, { recursive: true });

    return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
        if (err) {
        reject(createError({
            statusCode: 400,
            message: '上传文件失败'
        }));
        }
        if (files.file === undefined) {
        throw createError({
            statusCode: 400,
            message: '上传文件不能为空'
        });
        }
        const file = files.file[0];
        if (file.originalFilename === undefined || file.originalFilename === '') {
            throw createError({
                statusCode: 400,
                message: '上传文件不能为空'
            });
        }
        const newFilename = `${Date.now()}${file.originalFilename?.slice(file.originalFilename.lastIndexOf('.'))}`;
        const filePath = join(uploadDir, newFilename);
        renameSync(file.filepath, filePath);
        await db.sql`UPDATE users SET avatar = ${`/public/avatars/${newFilename}`} WHERE id = ${userInfo.userId}`;
    });
    });
});