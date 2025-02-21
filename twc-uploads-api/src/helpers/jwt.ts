import jwt, { SignOptions } from 'jsonwebtoken'

const issuer = 'TWC-Mobile';
const subject = 'In house users';

export const signOptions = {
    issuer,
    subject,
    audience: 'All employees',
    expiresIn: process.env.ENVIRONMENT == 'development' ? '1h' : "12h",
    // algorithm: "RS256"
} as SignOptions

const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, '\n') as string

export const generateToken = (userId: string, sessionId?: string) => {
    const token = jwt.sign({ userId: `${userId}`, sid: sessionId }, privateKey, signOptions)
    return token
}