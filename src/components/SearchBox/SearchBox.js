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
      <div className="searchBox">
        <form
          className="searchForm"
          onSubmit={searchBoxSubmitHandler}
        >
          <label className="searchFormLabel">
          Search Movie:
            <input
              value={searchLine}
              type="text"
              className="searchFormInput"
              onChange={searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="searchFormSubmit"
            disabled={!searchLine}
          >
            Search
          </button>
        </form>
      </div>
    );
}

export default connect(null)(SearchBox);
