import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Books() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchGenre, setSearchGenre] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_BOOKS_URI, { withCredentials: true })
    .then(res => {
      setBooks(res.data.books);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const searchQueryHandler = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  const searchGenreHandler = (e) => {
    const newSearchGenre = e.target.value;
    setSearchGenre(newSearchGenre);
  }

  const searchBooksHandeler = (e) => {
    e.preventDefault();
    console.log("search test " + searchQuery + searchGenre)
    axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
      params: {
        title: searchQuery,
        genre: searchGenre
      }
    })
    .then(res => {
      const newBooks = res.data; // Accessing the nested books array
      setBooks(newBooks);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
        <form>
          <input name="search" placeholder="Search books" onChange={searchQueryHandler} />

          <select onChange={searchGenreHandler} value={searchGenre}>
            <option value="" isDisabled={true}>Genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-fi">Sci-fi</option>
          </select>

          <button type="submit" name="search" onClick={searchBooksHandeler}>Search</button>
        </form>

        {books.map((book, index) => {
           return (
            <ul key={index}>
                <li>Name: {book.title}</li>
                <li>Author: {book.author}</li>
                <li>Genre: {book.genre}</li>
            </ul>
           ) 
        })}
    </div>
  );
};
