const express = require('express') //express 모듈 가져옴
//const { truncateSync } = require('fs')
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const config = require('./config/key');

const {User} = require("./models/User");

//application/x-www-form-urlencoded 로 된 정보를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application/json 형식으로 된 정보를 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //에러 방지
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! 노드몬 테스트 중'))

app.post('/register', (req, res) => { //회원가입을 위한 라우터
//클라이언트가 보내주는 정보를 가져와서
//그것들을 DB에 넣는다
    const user = new User(req.body) //bodyParse를 이용해 정보를 받음
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({ 
            success: true //성공하면(status 200) json형식으로 아래와 같이 띄워라

        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))