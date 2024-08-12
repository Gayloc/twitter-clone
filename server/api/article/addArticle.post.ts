// addArticle.post.ts
import authMiddle from '~/server/utils/auth';
import type { Fields, Files } from 'formidable';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

// 函数生成自定义文件名
const generateFilename = (originalName: string, username: string) => {
  const timestamp = Date.now();
  const ext = path.extname(originalName);
  return `${username}-${timestamp}${ext}`;
};

export default defineEventHandler(async (event) => {
  // TODO 验证用户身份
  await authMiddle(event);

  // 文件夹
  const uploadDir = path.join(process.cwd(), 'public' , 'cover');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // 表单解析器
  const form =
        formidable({ multiples: false, uploadDir: uploadDir, keepExtensions: true });

  // 数据库连接
  const db = useDatabase();

  // 获取用户信息,身份验证
  const userInfo = event.context.auth;

  // 解析表单数据
  return new Promise<{ success: boolean; message: string; }>((resolve, reject) => {
    // 解析表单数据
    form.parse(event.node.req, async (err, fields: Fields, files: Files) => { 
      // 处理错误
      if (err) {
        reject(err);
      } else { 

        // 验证字段title
        if (fields.title === undefined ||!fields.title || fields.title.length === 0 || fields.title[0] === '') {
          reject(new Error('invalid title'));
          return;
        }
        const title = fields.title[0];

        // content为空错误
        if (fields.content === undefined ||!fields.content || fields.content.length === 0 || fields.content[0] === '') {
          reject(new Error('invalid content'));
          return;
        }
          const content = fields.content[0];
          
          // 验证字段author_name
        if (fields.author_name === undefined ||!fields.author_name || fields.author_name.length === 0 || fields.author_name[0] === '') {
            reject(new Error('invalid author_name'));
            return;
          }
          const author_name = fields.author_name[0];

        // cre_time为空错误
        if (fields.cre_time === undefined ||!fields.cre_time || fields.cre_time.length === 0 || fields.cre_time[0] === '') {
          reject(new Error('invalid cre_time'));
          return;
        }
        if (!fields.cre_time || isNaN(Number(fields.cre_time))) {
          reject(new Error('cre_time is missing or not a number'));
          return;
        }

        // TODO 将 cre_time 转换为 number 类型
        const cre_time = Number(fields.cre_time[0]);  

        // 处理 files.cover 是数组的情况
        const cover = Array.isArray(files.cover) ? files.cover[0] : files.cover;
        if (!cover || !cover.filepath || !cover.originalFilename) {
          reject(new Error('cover file is missing'));
          return;
        }
        if (cover.originalFilename === null)
          {
            reject(new Error('cover file is missing'));
            return;
        }
        
          // 自定义文件名
          const newFilename = generateFilename(cover.originalFilename , userInfo.userId);
          const newFilepath = path.join(uploadDir, newFilename);

          // TODO 重命名文件
          fs.renameSync(cover.filepath, newFilepath);
          const coverUrl = `/_nuxt/public/cover/${newFilename}`;
          
          db.sql`INSERT INTO article (author_id, title, main, cover, cre_time, author_name) 
          VALUES (${userInfo.userId}, ${title}, ${content}, ${coverUrl}, ${cre_time}, ${author_name})`;

        // TODO 返回成功信息
        resolve({ success: true, message: 'post created successfully' });
      }
    });
  });
});