//mongoose 모듈 가져옴
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    }, 
    email: {
        type: String,
        trim: true, //이메일 입력 시 공백 제거
        unique: 1
    }, 
    lastname: {
        type: String, 
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0, //1이면 관리자, 0이면 일반 사용자
    }, 
    image: String,
    tokenExp: { //토큰 유효기간
        type: Number
    }
})

const User = mongoose.model('user', userSchema) //스키마를 모델로 감싸줌

module.exports = { User } //다른 파일에서도 사용할 수 있게