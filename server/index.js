const express = require("express")
const cors = require("cors")
const pool = require("./db")
const app = express()

//middleware per il get,post,put,delete
app.use(cors())
app.use(express.json())

//Create
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body)
        const { name } = req.body
        const newTodo = await pool.query(
            "INSERT INTO users (name) VALUES($1) RETURNING *;",
            [name]
        )
        res.json(newTodo.rows[0]) // PER VEDERE LA RESPONSE DA POSTMAN CON SOLO I DATI ESSENZIALI
        //res.json(newTodo.rows[0]) PER VEDERE LA RESPONSE DA POSTMAN CON TUTTI I DATI
    } catch (err) {
        console.log(err.message)
    }
})

//Get all
app.get("/todos", async (req, res) => {
    try {
        console.log(req.body)
        const allTodo = await pool.query("SELECT * FROM users;")
        res.json(allTodo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//Get id
app.get("/todos/:id", async (req, res) => {
    try {
        console.log(req.params) //id
        const { id } = req.params
        const oneTodo = await pool.query("SELECT * FROM users WHERE id=$1;", [
            id,
        ])
        res.json(oneTodo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//Update
app.put("/todos/:id", async (req, res) => {
    try {
        console.log(req.params) //id
        const { id } = req.params //id preso dall'URL
        const { name } = req.body //nome preso dal body della request
        const deleteOneTodo = await pool.query(
            "UPDATE users SET name=$1 WHERE id=$2;",
            [name, id]
        )
        res.json("lo user e stato AGGIORNATO!")
    } catch (err) {
        console.log(err.message)
    }
})

//D  elete
app.delete("/todos/:id", async (req, res) => {
    try {
        console.log(req.params) //id
        const { id } = req.params
        const deleteOneTodo = await pool.query(
            "DELETE FROM users WHERE id=$1;",
            [id]
        )
        res.json("lo user e stato ELIMINATO!")
    } catch (err) {
        console.log(err.message)
    }
})

//APP LISTENING START
app.listen(3000, () => {
    console.log("listening on port 3000")
})
