// Redux
import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types';

export default function(state={}, action){
    switch (action.type) { // 어떤 action 즉, 어떤 type값이 오느냐에 따라 다른 조치를 취함
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload} // ...state: 파라미터로 온 state를 그대로 가져온다는 뜻
            break;

        case REGISTER_USER:
            return {...state, register: action.payload} // ...state: 파라미터로 온 state를 그대로 가져온다는 뜻
            break;
    
        default:
            return state;
    }
}