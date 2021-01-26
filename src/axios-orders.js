import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-4d89f-default-rtdb.firebaseio.com/'
});

export default instance