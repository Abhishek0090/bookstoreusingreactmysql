import express from "express";
import mysql2 from "mysql2"; //use mysql2 for skipping authentication issue

const app = express();
const port = 8800;

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "abhishek",
    database: "test"
})



//If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'abhishek';  

app.use(express.json()); //for sending json from client to backend

app.get('/', (req, res) => {
    res.json('Hello this is the backend server')
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"

    //for  running query of sql

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)" // ("?") for security
    const values = [req.body.title, req.body.desc, req.body.cover];

    //executing our query
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books has been Created")
    })
})

app.listen(port, () => {
    console.log(`Connected to Backend bruh http://localhost:${port}`);
})