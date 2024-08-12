// logout.get.ts
export default defineEventHandler(async (event) => {
    // 清除 cookie
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: false,
        maxAge: -1
    });

    // 返回结果
    return {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully'
    };
});