import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (userId: string, role: string): string => {
    return jwt.sign({userId, role}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
}

// Returns the user id from the token
export const getIdFromToken = (token: string): string => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    return decoded.userId
}

export const getRoleFromToken = (token: string): string => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string }
    return decoded.role
}