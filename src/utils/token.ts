import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (userId: string): string => {
    return jwt.sign({userId}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
}

//Returns the user id from the token
export const getIdFromToken = (token: string): string => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    return decoded.userId
}