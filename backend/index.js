import express from "express";
import mysql2 from "mysql2"; //use mysql2 for skipping authentication issue
import cors from "cors";


const app = express();
const port = 8800;

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "abhishek",
    database: "test"
})

app.use(cors()); //cors for using our application on browser

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
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)" // ("?") for security
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];

    //executing our query
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books has been Created")
    })
})


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});



app.listen(port, () => {
    console.log(`Connected to Backend bruh http://localhost:${port}`);
})