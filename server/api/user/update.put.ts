import authMiddle from '~/server/utils/auth';
import updateAvatar from '~/server/utils/updateAvatar';

export default defineEventHandler(async (event) => {
  await authMiddle(event);
  const db = useDatabase();
  // 获取用户信息,身份验证
  const userInfo = event.context.auth;
  // 处理文件上传
  const body = await readMultipartFormData(event);
  if (body === null ||  body === undefined || body.length === 0) {
    throw createError({
      statusCode: 400,
      message: '上传文件不能为空'
    });
  }
  const name = body.find(item => item.name === 'name')?.data.toString('utf8');
  const email = body.find(item => item.name === 'email')?.data.toString('utf8');
  const age = body.find(item => item.name === 'age')?.data.toString('utf8');
  const avatar = body.find(item => item.name === 'avatar')?.data;
  // 上传文件
  await updateAvatar();
});