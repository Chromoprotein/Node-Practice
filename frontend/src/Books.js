import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Books() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchGenre, setSearchGenre] = useState();
  const [sortBy, setSortBy] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
        params: {page: 1} });
        setBooks(res.data.books);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
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

  const sortHandler = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
  }

  // GET request has withCredeintials and params together in the same configuration object
  const searchBooksHandeler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
        params: {
          title: searchQuery,
          genre: searchGenre,
          sortBy: sortBy,
          page: 1
        }
      });
      setBooks(res.data.books);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } 
    catch (err) {
      console.log(err);
    }
  }

  const paginationButtonNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const paginate = async (e) => {
    e.preventDefault();
    const pageFromButton = e.target.value;

    try {
      const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
        params: {
          title: searchQuery,
          genre: searchGenre,
          sortBy: sortBy,
          page: pageFromButton
        }
      });
      setBooks(res.data.books);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
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
            <option value="War">War</option>
            <option value="Zombies">Zombies</option>
            <option value="Crime">Crime</option>
            <option value="Romance">Romance</option>
            <option value="Nonfiction">Nonfiction</option>
          </select>

          <select onChange={sortHandler} value={sortBy}>
            <option value="title:asc">Title A-Z</option>
            <option value="title:desc">Title Z-A</option>
            <option value="author:asc">Author A-Z</option>
            <option value="author:desc">Author Z-A</option>
          </select>

          <button type="submit" name="search" onClick={searchBooksHandeler}>Search</button>
        </form>

        {books.map((book, index) => {
          const bookId = book._id;
           return (
            <ul key={index}>
                <li>Id: {bookId}</li>
                <li>Name: {book.title}</li>
                <li>Author: {book.author}</li>
                <li>Genre: {book.genre}</li>
                <li><Link to={`details/${bookId}`}>Details</Link></li>
            </ul>
           ) 
        })}

      <nav>

        <button onClick={paginate} value={currentPage - 1} disabled={currentPage === 1}>Previous</button>

        {paginationButtonNumbers.map((paginationNumber, index) => {
          return <button 
            key={index} 
            onClick={paginate}
            value={paginationNumber} 
            disabled={currentPage === paginationNumber}>
              {paginationNumber}
            </button>
        })}

        <button onClick={paginate} value={currentPage + 1} disabled={currentPage === totalPages}>Next</button>
      </nav>
    </div>
  );
};
