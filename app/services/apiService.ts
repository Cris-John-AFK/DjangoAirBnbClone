import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);
        
        const token = await getAccessToken();

        return new Promise((resolve, reject)=>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);
        const token = await getAccessToken();

        return new Promise((resolve, reject)=>{
            const headers: any = {
                'Authorization': `Bearer ${token}` 
            };

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

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'POST',
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject)=>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

}

export default apiService;
