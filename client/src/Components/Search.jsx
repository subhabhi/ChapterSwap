import React, { useState } from "react";
import { base_url } from "../constants";
import "../Styles/Search.css";
import axios from "axios";


export const Search = () => {
  const [query, setQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);

  const handleSearch = async () => {
    const user_data = { query: query };
    const response = await axios.post(`${base_url}/getBook`, user_data);
    setFoundBooks(response.data.foundBooks);
  };

  const handleCollect = async (bookId) => {
    const user_data = {
      username: localStorage.getItem("username"),
      id: bookId,
    };
    await axios.post(`${base_url}/collect`, user_data);
  };

  return (
    <div className="search-container">
      <nav class="navbar navbar-light bg-light" id="searchBar">
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search by book name"
            aria-label="Search"
            onChange={(e) => setQuery(() => e.target.value)}
          />
          <button
            class="btn btn-outline-primary my-2 my-sm-0"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </nav>
      <div className="result">
        {foundBooks.map((data) => {
          return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {data.address}
                </h6>
                <p className="card-text">
                  <i>Author</i>:{data.author}
                  <br />
                  <i>Publication Date</i> : {data.publicationDate.substring(0, 10)}
                  <br />
                </p>
                {data.status === "listed" ? (
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={(e) => handleCollect(data._id)}
                  >
                    Collect
                  </button>
                ) : (
                  <p className="card-text">
                    <i>Collected from</i> : {data.username}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
