import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Books() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchGenre, setSearchGenre] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BOOKS_URI, { withCredentials: true });
        setBooks(res.data.books);
      } catch (err) {
        console.error(err);
      }
    }
    getAllBooks();
  }, [])

  const searchQueryHandler = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  const searchGenreHandler = (e) => {
    const newSearchGenre = e.target.value;
    setSearchGenre(newSearchGenre);
  }

  // GET request has withCredeintials and params together in the same configuration object
  const searchBooksHandeler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
        params: {
          title: searchQuery,
          genre: searchGenre
        }
      });
      setBooks(res.data);
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
        <form>
          <input name="search" placeholder="Search books" onChange={searchQueryHandler} />

          <select onChange={searchGenreHandler} value={searchGenre}>
            <option value="" disabled selected>Genre</option>
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
