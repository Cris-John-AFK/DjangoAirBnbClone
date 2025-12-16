import { getAccessToken, getRefreshToken, handleJwtRefresh } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
        const fullUrl = `${apiHost}${url}`.replace('localhost', '127.0.0.1');

        console.log('Fetching URL:', fullUrl);

        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let response = await fetch(fullUrl, {
            method: 'GET',
            headers: headers
        });

        if (response.status === 401) {
            console.log('401 detected, trying refresh');

            try {
                const refreshToken = await getRefreshToken();

                if (refreshToken) {
                    const refreshUrl = `${apiHost}/api/auth/token/refresh/`.replace('localhost', '127.0.0.1');

                    const refreshResponse = await fetch(refreshUrl, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        console.log('Refresh success');
                        await handleJwtRefresh(data.access, data.refresh || refreshToken);

                        // Retry original request with new token
                        headers['Authorization'] = `Bearer ${data.access}`;
                        response = await fetch(fullUrl, {
                            method: 'GET',
                            headers: headers
                        });
                    } else {
                        console.error('Refresh failed with status:', refreshResponse.status);
                    }
                } else {
                    console.error('No refresh token available');
                }
            } catch (refreshError) {
                console.error('RefreshToken failed:', refreshError);
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log('Response:', json);
        return json;
    },
    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);
        const token = await getAccessToken();
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
        const fullUrl = `${apiHost}${url}`.replace('localhost', '127.0.0.1');

        const headers: any = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let body: any;

        // Check if data is FormData
        if (data instanceof FormData) {
            // Don't set Content-Type for FormData - let the browser handle it
            body = data;
        } else {
            // For regular JSON data
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        let response = await fetch(fullUrl, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (response.status === 401) {
            console.log('401 detected, trying refresh');

            try {
                const refreshToken = await getRefreshToken();

                if (refreshToken) {
                    const refreshUrl = `${apiHost}/api/auth/token/refresh/`.replace('localhost', '127.0.0.1');

                    const refreshResponse = await fetch(refreshUrl, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });

                    if (refreshResponse.ok) {
                        const refreshData = await refreshResponse.json();
                        console.log('Refresh success');
                        await handleJwtRefresh(refreshData.access, refreshData.refresh || refreshToken);

                        // Retry original request with new token
                        headers['Authorization'] = `Bearer ${refreshData.access}`;
                        response = await fetch(fullUrl, {
                            method: 'POST',
                            headers: headers,
                            body: body
                        });
                    } else {
                        console.error('Refresh failed with status:', refreshResponse.status);
                    }
                } else {
                    console.error('No refresh token available');
                }
            } catch (refreshError) {
                console.error('RefreshToken failed:', refreshError);
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log('Response:', json);
        return json;
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
        const fullUrl = `${apiHost}${url}`.replace('localhost', '127.0.0.1');

        return new Promise((resolve, reject) => {
            fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error) => {
                    console.error('API Error:', error);
                    reject(error);
                })
        })
    },

}

export default apiService;
