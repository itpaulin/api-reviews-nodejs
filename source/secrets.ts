import dotenv from 'dotenv';

// TODO IMPLEMENT ZOD VALIDATION HERE

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.AUTH_SECRET!;
