
const moment = require('moment');

const  userMessage = (username, text)=>{
    return ({
        username, text,
        time: moment().format('h:mm a')
    })

}


module.exports = userMessage;