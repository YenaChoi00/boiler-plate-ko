import React, {useEffect} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

function LandingPage(props) {

    useEffect(() => {               // 랜딩페이지에 들어오자 마자 실행함
        axios.get('/api/hello')     // 서버(server/index.js)로 보내는 앤드포인트(?)
        .then(response => { console.log(response.data)}) // 서버에서 받은 응답을 콘솔창에 보여줌
    }, [])

    const onClickHandler= () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.payloag.success){
                props.history.push("/login")    // 성공하면 로그인페이지로 이동
            } else{
                alert("Failed to logout")
            } 
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
            
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)