import jwt from 'jsonwebtoken';
export const APP_SECRET = 'GraphQL-is-aw3some';
export function decodeAuthHeader(authHeader) {
    // 2
    const token = authHeader.replace('Bearer ', ''); // 3
    if (!token) {
        throw new Error('No token found');
    }
    return jwt.verify(token, APP_SECRET); // 4
}
