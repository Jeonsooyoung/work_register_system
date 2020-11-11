//routes
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todolist')
const moment = require('moment');
const mongoose = require('mongoose');

//const mongoose = require('mongoose')
//const todolists = mongoose.model('list',listSchema)

// Gets All Members
router.get('/', (req, res) => {
  //1.문자열 전송 
  //res.send("express router is working") 
  //2. 페이지 전송
  //res.render('index') public의 index.html 로 이동
  //const datas = Mongoose.model('docs',listSchema,list)
  Todo.find((err,docs)=> {
    if (err) throw err;
    res.render('index',{
      lists:docs
    })    
  }).catch(err => {
    console.log(err);
  })
  
  //res.json(todolists)
  //res.render("index", {todolists})
  /*Todo.find({},function(err,todoLIst){
    if(err) console.log(err)
    else {
      res.render("index", {todoLIsts})
    }
  })*/
});

router.get('/dashboard', (req, res) => {
  Todo.find((err,docs)=> {
    if (err) throw err;
    res.render('dashboard',{
      lists:docs
    })    
  }).catch(err => {
    console.log(err);
  })
});
router.get('/dataInfoSet', (req, res) => {
  res.render('dataInfoSet')
});
router.get('/workLibrary', (req, res) => {
  res.render('workLibrary')
});

// Create Member
router.post('/newToDo', (req, res, next) => {
  console.log("item submitted");
  
  /*
  방법 1) 화면의 데이터를 각각의 변수에 할당
  const status= 'active';
  const manager = req.body.manager;
  const teamName = req.body.teamName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const dueDate = req.body.dueDate;
  const getDate=  req.body.getDate;
  const tasks=  req.body.tasks;
  */
  
  //const {status,manager,teamName,startDate,endDate,dueDate,getDate,tasks} = req.body;
  // const newItem = {
  //   __id : uuid.v4,
  //   status: 'active',  
  //   ...req.body
  // };
  

  const uuid = require('uuid');
  var {manager,teamName,startDate,endDate,dueDate,getDate,tasks} = req.body;
  
  var startDate_date = moment(startDate).format("YYYY-MM-DD"),
  endDate_date = moment(endDate).format("YYYY-MM-DD"),
  dueDate_date = moment(dueDate).format("YYYY-MM-DD"),
  getDate_date = moment(getDate).format("YYYY-MM-DD");

  //console.log(startDate)
  const listTodo = new Todo ({
    //id : uuid.v4,
    status:"active",
    manager,
    teamName,
    startDate: startDate_date,
    endDate: endDate_date,
    dueDate: dueDate_date,
    getDate: getDate_date,
    tasks
  })
  console.log("listTodo", listTodo)
  listTodo.save(err=> {
    if(err) {
      console.log(`Something went wrong to save data to database ${err}`)
    } else {
        console.log("Data is recorded successfully")
        res.redirect("/")       
    }
  })
  
  // if (!listTodo.manager || !listTodo.teamName || !listTodo.tasks || !listTodo.getDate || !listTodo.startDate || !listTodo.dueDate) {
  //   return res.send({ msg: 'Please put text in the input' });
  // }

  //todolists.push(newItem);
  //res.json(todolists);
});




//const { request } = require('express');
//const { Mongoose } = require('mongoose');
//const idFilter = req => member => member.id === parseInt(req.params.id);

//res.render('index', {title: '할일 관리',todolists})
//var Todo = mongoose.model("list",listSchema)
//require('./models/db');


/* Get Single Member
router.get('/:id', (req, res) => {
  const found = todolists.some(idFilter(req));

  if (found) {
    res.json(todolists.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});*/

// ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
  console.log(req.params.id);
  // res.send(req.params.id);
  Todo.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
      mongoose.set('useFindAndModify', false);
      console.log(docs);
      
      console.log(docs.name);
      
      // console.log(docs._id);
      
      res.render('edit', {lists:docs});
  })
});

// ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res, next) => {
  // let team = {};
  
  // const {
  //     name,
  //     players,
  //     coach
  // } = req.body;

  // team.name = name;
  // team.players = players;
  // team.coach = coach;
  // console.log(team);
  
  Todo.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
      if (err) {
          console.log(err);
          next(err);
      } else {
          res.redirect('/');
      }
  })
  // next();
});



router.get('/:id',(req, res)=>{
  Todo.findByIdAndDelete({_id:req.params.id}, err=>{
      if(err){
          console.log(err);
      }else{
          res.redirect('/');
      }
  });
})
/* 
// Update Member
router.put('/:id', (req, res) => {
  const found = todolists.some(idFilter(req));

  if (found) {
    todolists.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updMember = {...member, ...req.body};
        todolists[i] = updMember
        res.json({ msg: 'Member updated', updMember });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = todolists.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Member deleted',
      todolists: todolists.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

Homepage Route
router.get('/*', (req, res) =>
  res.send("<h1>invalid page</h1>")//오류 페이지
);*/

module.exports = router;
