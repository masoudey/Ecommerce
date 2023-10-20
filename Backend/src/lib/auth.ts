import Iron from '@hapi/iron';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies.js';
import { IncomingMessage, ServerResponse } from 'http';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export type Session = {
    id: string;
    email: string;
};

export async function setLoginSession(res: ServerResponse, session: Session) {
    const createdAt = Date.now();
    // Create a session object with a max age that we can validate later
    const obj = { ...session, createdAt, maxAge: MAX_AGE };
    const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

    setTokenCookie(res, token);
    // console.log('res cookies', res?.getHeaders());
}

export async function getLoginSession(req: IncomingMessage): Promise<Session> {
    const token = getTokenCookie(req);

    if (!token) return;

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) {
        throw new Error('Session expired');
    }

    return session;
}
