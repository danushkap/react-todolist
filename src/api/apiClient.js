import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3500'
});

export default apiClient
