import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => { // 랜딩페이지에 들어오자 마자 실행함
        axios.get('/api/hello') // 서버(server/index.js)로 보내는 앤드포인트(?)
        .then(response => { console.log(response)}) // 서버에서 받은 응답을 콘솔창에 보여줌
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
