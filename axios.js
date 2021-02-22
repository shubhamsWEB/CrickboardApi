import axios from 'axios';
export const configAxios = (url) => {
    return axios.create({
        baseURL: url,
        withCredentials: true
    });
}