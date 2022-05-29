import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";
import { connect } from "react-redux";

function Movies(props) {
    return (
      <ul className="movies">
        {props.movies.map((movie) => (
          <li className="moviesItem" key={movie.imdbID}>
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
    );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};
export default connect(mapStateToProps)(Movies);
