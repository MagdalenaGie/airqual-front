import axios from 'axios';

const baseURL = 'sometesturl';
const instance = axios.create({
    baseURL: baseURL
});

export default instance;