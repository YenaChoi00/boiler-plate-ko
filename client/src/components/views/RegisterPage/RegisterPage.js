import React, {useState} from 'react'
import {useDispatch} from 'react-redux';   // dispatch를 통해서 action을 취함. 그리고 redux로 감
import {registerUser} from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value) // setEmail을 이용하여 Email의 state를 바꿔준다.
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아래 코드를 수행하지 않고 페이지가 새로고침 되버리는 것을 방지
        
        // console.log('Email', Email)
        // console.log("Password", Password)
        if (Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password, 
            name: Name
        }

        
        dispatch(registerUser(body))  // loginUser라는 action
            .then(response=>{
                if(response.payloag.success){
                    props.history.push("/login")
                } else{
                    alert("Failed to sign up")
                }                        
            }) 

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
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
