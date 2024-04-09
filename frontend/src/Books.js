import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BOOKS_URI, { withCredentials: true })
    .then(res => {
      setBooks(res.data.books);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
        {books.map((book, index) => {
           return (
            <ul key={index}>
                <li>Name: {book.title}</li>
                <li>Author: {book.author}</li>
            </ul>
           ) 
        })}
    </div>
  );
};
