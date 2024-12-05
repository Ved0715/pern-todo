const express = require('express');
const cors = require('cors');


const pool = require('./db')

const app = express();

app.use(cors());
app.use(express.json());

// create a Todo
app.post("/todo" , async (req, res, next) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query( "INSERT INTO todo (description) VALUES($1) RETURNING *" , [description]);
        

        res.json(newTodo.rows[0]);
    }
    catch (err){
        console.error(err.message)
    };
})

// get all todo

app.get("/todo" , async (req , res , next) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todo/:id" , async(req, res ,next) => {
    try{
        const {id} = req.params ;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id === $1" , [id]);
        res.json(todo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }
})

// update a todo

app.put("/todo/:id" , async (req, res , next) => {
     try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description , id] );
        res.json("Todo was Updated!")
     }
     catch (err) {
        console.error(err.message)
     }
})

//delete a todo

app.delete( '/todo/:id' , async (req, res ,next) => {
    try {
        const {id} =req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleated!");
    }
    catch (err) {
        console.error(err.message)
    }
});

app.listen(2000 , ()=> {
    console.log('server has started in port 2000')
});