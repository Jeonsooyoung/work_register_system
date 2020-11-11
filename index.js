//기본
const express = require('express');
const todoRouter = require('./routes/todolists');
//const keys = require('./config/keys');
const Todo = require('./models/Todolist');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//port 설정
const PORT = process.env.PORT || 5000;

//DB 연결
require('dotenv').config({path :'variables.env'});
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {dbName: 'todoDB', useNewUrlParser:true, useUnifiedTopology: true})
.then(console.log("mongodb is connected successfully"))
.catch(err=>console.log("An error is occered to connect to db"));

/*const { db } = require('./models/TodoList');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
  if(err) {
      console.log(`Error in DB Connection ${err}`)
  } else {
      console.log("DB Connected to database successfully")                
  }
})
*/
const db = mongoose.connection;
db.on('error', () => console.log("something went wront to connect to database"))
db.once("open",()=>{
  console.log("DB Connection has been made sucessfully")
})

// 템플릿 엔진 설정 : Handlebars Middleware
const exphbs = require('express-handlebars');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  extname:'handlebars',
  defaultLayout:'main',
  layoutsDir:__dirname + 'views/layouts/'
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//라우터 연결
//주소창에 localhost:5000시, 페이지 로드
//자세한 것은 routes/api/rodolists.js 에  get  매서드로 나와있음
// API Routes
app.use("/",todoRouter);


// Set static folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//포트 연결 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const logger = require('./middleware/logger');
//require('./models/Todolist');


/* Homepage Route
const todolists = require('./Todolists');
app.get('/', (req, res) =>
  res.render('index', {
    title: '할일 관리',
    todolists
  })
);
*/
// Init middleware
// app.use(logger);



