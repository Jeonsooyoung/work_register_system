//model.js 
//mongoose 임포트 하고, 스키마 생성
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    manager:{
        type:String
    },
    teamName:{
        type:String
    },    
    tasks:{
        type:String,
        required:true
    },
    getDate:{
        type:String
    },
    dueDate:{
        type:String
    },
    startDate:{
        type:String
    },
    dueDate:{
        type:String
    },
    endDate:{
        type:String
    }
}, {
    collection:'todo_list',
    timestamps:true//언제 생성했는지 기록// 언제 업데이트 되었는지 기록
}) 

module.exports = mongoose.model('lists',listSchema)//listSchema 라는 것을 확실하게 명시