import axios from "axios";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default api;
export const fetcher = (url: string) => api.get(url).then(res => {
    return res.data;
}).catch(err => { throw err });