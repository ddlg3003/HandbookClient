import axios from 'axios';

const url = 'http://localhost:5000/auth';

export const googleToken = (code) => axios.post(`${url}/google`, { code });