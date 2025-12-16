'use server';

import { cookies } from 'next/headers';

export async function handleJwtRefresh(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    
    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    // If no refresh token, don't try to refresh
    if (!refreshToken) {
        console.log('No refresh token available, cannot refresh');
        await resetAuthCookies();
        return null;
    }

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(async (json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                await handleJwtRefresh(json.access, json.refresh || refreshToken);
                return json.access;
            } else {
                console.log('Refresh failed:', json);
                await resetAuthCookies();
                return null;
            }
        })
        .catch(async (error) => {
            console.log('error', error);

            await resetAuthCookies();
            return null;
        })

    return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.set('session_userid', '', { path: '/' });
    cookieStore.set('session_access_token', '', { path: '/' });
    cookieStore.set('session_refresh_token', '', { path: '/' });
}

//
// Get data

export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid')?.value
    return userId ? userId : null
}

export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh_token')?.value;

    return refreshToken;
}