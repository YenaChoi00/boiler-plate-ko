import axios from 'axios';
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit){ // 파라미터를 통해 받음
    const request = axios.post('/api/user/login', dataToSubmit)
        .then(response => response.data) // server에서 받은 데이터를 request 변수에 저장

    // reducer로 보냄: 이전 state과 action을 조합해서 다음 state를 만든다.
    return {
        type: LOGIN_USER,
        payload: request 
    }  
}