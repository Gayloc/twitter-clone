import bcrypt from 'bcrypt';

interface registerBody {
    email: string,
    password: string,
}

interface user {
    id: number;
    email: string;
    user_name: string;
    avatar: string;
    password: string;
    age: number;
}

interface userRows { 
    rows: user[]; 
}

export default defineEventHandler(async (event) => { 
    const body = await readBody<registerBody>(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        });
    }

    const db = useDatabase();

    const existingUser = 
        await db.sql<userRows>`SELECT * FROM users WHERE email = ${email}`;
    
    if (existingUser.rows.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.sql`INSERT INTO users (email, user_name, password) VALUES (${email}, ${email}, ${hashedPassword})`;

    return {
        success: true,
        message: 'User created successfully'
    };
});