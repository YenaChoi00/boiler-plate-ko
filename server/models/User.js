//mongoose 모듈 가져옴
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10 // 비번 자릿수
const jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

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
    password: {
        type: String,
        minlength: 5
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
    token: {
        type: String
    },
    tokenExp: { //토큰 유효기간
        type: Number
    }
})

userSchema.pre('save', function(next) { //유저 모델에 유저 정보를 저장(server/index.js)하기 전에 실행할 부분
    // 비밀번호 암호화
    var user = this; // userSchema 가리킴

    if(user.isModified('password')){ // field중 password가 바뀔 때만 암호화를 한다.(이름, 이메일 변경 시에는 재암호화X)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash    // plain 비번 = 암호화된 비번. 값 넣어줌
                next()
            })
        }) 
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){ // cb는 콜백함수
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch); // isMatch가 true의미
    })
}

userSchema.methods.generateToken = function(cb){
    // jasonwebtoken을 이용해 토큰 생성
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // 원리: user._id + 'secretToken' = token
    //      'secretToken' -> user._id
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)  // 에러없으면 index.js에 user (유저정보) 전달
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    // 토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해 유저를 찾고, client에서 가져온 토큰과 db에 호환된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('user', userSchema) //스키마를 모델로 감싸줌

module.exports = { User } //다른 파일에서도 사용할 수 있게