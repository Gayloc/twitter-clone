import multer from 'multer';
import authMiddle from '~/server/utils/auth';

// 设置存储引擎
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/avatars/'); // 文件存储的目录
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // 生成唯一的文件名
    }
});

// 创建上传对象
const upload = multer({
    storage: storage
});

export default defineEventHandler(async (event) => { 
    await authMiddle(event);
    // 获取用户信息,身份验证
    const userInfo = event.context.auth;
    // 处理文件上传
    const body = await readMultipartFormData(event);
    // 获取表单字段
    const name = formData.get('name');
});