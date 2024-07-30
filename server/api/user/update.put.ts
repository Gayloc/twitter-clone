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
  const uploadDir = path.join(process.cwd(), 'public' , 'avatars');
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

  return new Promise<{ success: boolean; message: string; }>((resolve, reject) => {
    form.parse(event.node.req, async (err, fields: Fields, files: Files) => { 
      if (err) {
        reject(err);
      } else { 
        if (fields.name === undefined ||!fields.name || fields.name.length === 0) {
          reject(new Error('invalid name'));
          return;
        }
        const name = fields.name[0];
        if (fields.email === undefined ||!fields.email || fields.email.length === 0) {
          reject(new Error('invalid email'));
          return;
        }
        const email = fields.email[0];
        if (fields.age === undefined ||!fields.age || fields.age.length === 0) {
          reject(new Error('invalid age'));
          return;
        }
        if (!fields.age || isNaN(Number(fields.age))) {
          reject(new Error('Age is missing or not a number'));
          return;
        }

        // TODO 将 age 转换为 number 类型
        const age = Number(fields.age[0]);  

        // 处理 files.avatar 是数组的情况
        const avatar = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;
        if (!avatar) {
          reject(new Error('Avatar file is missing'));
          return;
        }
        if (avatar.originalFilename === null)
          {
            reject(new Error('Avatar file is missing'));
            return;
        }
        
          // 自定义文件名
          const newFilename = generateFilename(avatar.originalFilename , userInfo.userId);
        const newFilepath = path.join(uploadDir, newFilename);
        
          // TODO 重命名文件
          fs.renameSync(avatar.filepath, newFilepath);
        const avatarUrl = `/public/${newFilename}`;

        // TODO 更新用户信息
        const count =
          await db.sql<number>`UPDATE users SET email = ${email} , user_name = ${name} , avatar = ${avatarUrl} , age = ${age}  WHERE id = ${userInfo.userId}`;

        if (count === 0) {
          reject(new Error('Failed to update user information'));
          return;
        }

        // TODO 返回成功信息
        resolve({ success: true, message: 'UserInfo updated successfully' });
      }
    });
  });

});