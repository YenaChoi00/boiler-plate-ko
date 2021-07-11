import React, {useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';   // dispatch를 통해서 action을 취함. 그리고 redux로 감
import {loginUser} from '../../../_actions/user_action';

function LoginPage() {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아래 코드를 수행하지 않고 페이지가 새로고침 되버리는 것을 방지
        
        // console.log('Email', Email)
        // console.log("Password", Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))  // loginUser라는 action

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
