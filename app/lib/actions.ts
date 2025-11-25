'use server';

import { cookies } from 'next/headers';

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    try {
        const cookieStore = await cookies();
        const cookieOptions = {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax' as const
        };
        
        cookieStore.set('session_userid', userId, cookieOptions);
        cookieStore.set('session_access_token', accessToken, cookieOptions);
        cookieStore.set('session_refresh_token', refreshToken, cookieOptions);
    } catch (error) {
        console.error('Error setting cookies:', error);
    }
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.set('session_userid', '');
    cookieStore.set('session_access_token', '');
    cookieStore.set('session_refresh_token', '');
}

export async function getUserId() {
    if (typeof window === 'undefined') {
        // Server-side
        const cookieStore = await cookies();
        return cookieStore.get('session_userid')?.value || null;
    } else {
        // Client-side
        const value = `; ${document.cookie}`;
        const parts = value.split(`; session_userid=`);
        if (parts.length === 2) {
            const part = parts.pop();
            if (part) {
                return part.split(';').shift() || null;
            }
        }
        return null;
    }
}