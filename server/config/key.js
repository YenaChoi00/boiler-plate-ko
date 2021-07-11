if(process.env.NODE_ENV === 'production'){ //배포 후
    module.exports = require('./prod')
} else{ //개발중일떄
    module.exports = require('./dev')
}