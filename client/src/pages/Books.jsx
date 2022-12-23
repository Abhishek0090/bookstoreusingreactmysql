import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Books = () => {


    const [books, setBooks] = useState([])


    useEffect(() => {

        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/books/${id}`);
          window.location.reload(); //for reloading
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <h1>Dead Book Shop</h1>
            <div className='books'>
                {
                    books.map(book => (
                        <div className='book' key={book.id}>
                            {book.cover && <img src={book.cover} alt="books" />}
                            <h2>{book.name}</h2>
                            <p>{book.desc}</p>
                            <span>{book.price}</span>
                            <button className="delete"  onClick={() => handleDelete(book.id)} >Delete</button>
                            <button className="update">
                                <Link
                                    to={`/update/${book.id}`}
                                    style={{ color: "inherit", textDecoration: "none" }}
                                >
                                    Update
                                    </Link>
                            </button>
                        </div>
                    ))

                }

            </div>
            <button>
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new Book
                </Link>
            </button>
        </div>
    )
}

export default Books