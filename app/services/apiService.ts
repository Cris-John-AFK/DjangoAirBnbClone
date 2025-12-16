import { getAccessToken, getRefreshToken, handleJwtRefresh } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
        const fullUrl = `${apiHost}${url}`.replace('localhost', '127.0.0.1');

        console.log('Fetching URL:', fullUrl);

        return new Promise((resolve, reject) => {
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            fetch(fullUrl, {
                method: 'GET',
                headers: headers
            })
                .then(async response => {
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
                                    const retryResponse = await fetch(fullUrl, {
                                        method: 'GET',
                                        headers: headers
                                    });

                                    if (!retryResponse.ok) {
                                        throw new Error(`HTTP error! status: ${retryResponse.status}`);
                                    }
                                    return retryResponse.json();
                                }
                            }
                        } catch (refreshError) {
                            console.error('RefreshToken failed:', refreshError);
                        }
                    }

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
    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);
        const token = await getAccessToken();
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
        const fullUrl = `${apiHost}${url}`.replace('localhost', '127.0.0.1');

        return new Promise((resolve, reject) => {
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

            fetch(fullUrl, {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(async response => {
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
                                    const retryResponse = await fetch(fullUrl, {
                                        method: 'POST',
                                        headers: headers,
                                        body: body
                                    });

                                    if (!retryResponse.ok) {
                                        throw new Error(`HTTP error! status: ${retryResponse.status}`);
                                    }
                                    return retryResponse.json();
                                }
                            }
                        } catch (refreshError) {
                            console.error('RefreshToken failed:', refreshError);
                        }
                    }

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
