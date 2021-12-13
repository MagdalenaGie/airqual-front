import axios from 'axios';

const baseURL = 'http://172.20.0.19:5000';
const instance = axios.create({
    baseURL: baseURL
});

export default instance;