export default defineEventHandler(async (event) => {
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: false,
        maxAge: -1
    });
    return {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully'
    };
});