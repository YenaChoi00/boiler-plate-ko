import React, {useEffect} from 'react';
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
    // option 값의 종류
    // null: 아무나 출입이 가능한 페이지
    // true: 로그인한 유저만 출입이 가능한 페이지
    // false: 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {    // auth는 user_action에 정의됨. response에는 백엔드에서 처리해서 가져온 정보가 들어있음 
                // 로그인X
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }

                }else{ // 로그인O
                    if(adminRoute && !response.payload.isAdmin){    // 어드민이 아닌데 어드민 페이지 접근
                        props.history.push('/')
                    } else{
                        props.history.push('/')
                    }
                }
            })

        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}

