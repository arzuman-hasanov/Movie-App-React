import React, { useState } from "react";
import "./SearchBox.css";
import { connect } from "react-redux";
import { fetchMovies } from "../../state/actions/dataActions";

function SearchBox(props) {

  const [state, setState] = useState({
    searchLine: "",
  });
  
  const searchLineChangeHandler = (e) => {
    setState({ searchLine: e.target.value });
  };

  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    props.dispatch(fetchMovies(state.searchLine));
  };

    const { searchLine } = state;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
          Search Movie:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              onChange={searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
          >
            Search
          </button>
        </form>
      </div>
    );
}

export default connect(null)(SearchBox);
