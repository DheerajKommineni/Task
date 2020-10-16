const express= require('express');
const app= express();
const List = require('./database/models/List');
const Task = require('./database/models/Task');
const mongoose = require('./database/mongoose');

app.use(express.json());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/lists',(req,res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists',(req,res) => {
    new List({'title': req.body.title,'password':req.body.password})
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});
app.get('/Lists/:ListId', (req,res) =>{
    List.find({ _id: req.params.ListId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});
app.patch('/lists/:listId', (req,res) =>{
    List.findOneAndUpdate({ '_id': req.params.listId },{$set: req.body})
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks', (req,res) =>{
    (Task.find({ "_listId": req.params.listId.toString()}))
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error)); 
});
app.post('/lists/:listId/tasks', (req,res) =>{
    var valid= mongoose.Types.ObjectId.isValid(req.params.listId);
    if(valid){
    console.log(req.params.listId);   
   (new Task({'title': req.body.title,'deadline': req.body.deadline,'_listId': req.params.listId}))
    .save()
    .then((task)=> res.send(task))
    .catch((error)=> console.log(error));
    }
    else{
        console.log(req.params.listId);
    }
});
app.get('/lists/:listId/tasks/:taskId', (req,res) =>{
    Task.findOne({ _id: req.params.taskId, _listId: req.params.listId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});
app.patch('/lists/:listId/tasks/:taskId', (req,res) =>{
    Task.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId },{$set:req.body})
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});
app.patch('/lists/:listId/tasks/:taskId', (req,res) =>{
    Task.findOneAndDelete(req.params.listId)
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId', (req,res) =>{
    const deleteTasks=(list)=>{
        Task.deleteMany({ _listId: list._id})
        .then(() => list)
        .catch((error) => console.log(error));
    };
    const list= List.findOneAndDelete({ '_id' : req.params.listId})
                .then((list) => deleteTasks(list))
                .catch((error) => console.log(error));
    res.send(list);
});
app.delete('/lists/:listId/tasks/:taskId', (req,res) =>{
    Task.findOneAndDelete({ _id: req.params.taskId, _listId: req.params.listId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});


app.listen(3000, ()=> console.log("Server connected on port 3000"));