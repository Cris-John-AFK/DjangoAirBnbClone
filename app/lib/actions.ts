'use server';

import { cookies } from 'next/headers';

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    try {
        const cookieStore = cookies();
        
        // Set cookies directly
        cookieStore.set('session_userid', userId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax'
        });

        cookieStore.set('session_access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax'
        });

        cookieStore.set('session_refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax'
        });

        // Return a plain object
        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Failed to log in' };
    }
}