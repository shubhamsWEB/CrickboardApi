import axios from 'axios';
export default axios.create({
    baseURL: "http://192.168.0.169:3000/api",
    withCredentials:true
});