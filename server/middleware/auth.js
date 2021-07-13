const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user)=> {
        // 유저가 있으면 인증 성공
        if(err) throw err;
        // 유저가 없으면 인증 실패
        if(!user) return res.json({ isAuth: false, error: true })

        // user와 token정보를 사용하려고 전달해주는 것
        req.token = token;
        req.user = user;
        next();     // 이 함수는 미들웨어로 끝나면 원래 진행되던 함수(index.js의)가 계속되어야 한다.
    })
       
}

module.exports = { auth };
