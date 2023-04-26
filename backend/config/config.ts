import dotenv from 'dotenv';

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 3000,
    port: process.env.PORT,    
    dbUser:   process.env.DB_USER || '',
    dbPassword:   process.env.DB_PASSWORD || '',
    dbHost:   process.env.DB_HOST,
    dbName:   process.env.DB_NAME,
    dbPort:    process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET || '',
    cloudinary: process.env.CLOUDINARY_URL || '',
    s3accessKey: process.env.S3_ACCESS_KEY_ID || '',
    s3secretAccess: process.env.S3_SECRET_ACCESS_KEY || '',
}