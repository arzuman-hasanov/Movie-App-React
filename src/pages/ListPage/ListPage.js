import React, { useState, useEffect } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList, getMovieInfoByImdbID } from "../../state/actions/dataActions";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

function ListPage(props) {
 

  const [state, setState] = useState({
    isClicked: false
  })


  useEffect(()=>{
    const id = props.match.params.id
    console.log(id)
    props.getList(id)
  },[])

    console.log(props);
    return (
      <div className="list-page">
        <Link className="Link" to="/">
          <Header />
        </Link>
        <h1 className="list-page__title">{props.title}</h1>
        <ul className="ul">
          {props.movieDetails.map((item) => {
            return (
              <li key={item.imdbID} className="list-page__single-movie list">
                
                <div className="info">
                  <h3 className="movie-item__title">{item.Title}</h3>
                  <h4 className="movie-item__about">About movie</h4>
                  <div className="list-page__details">
                    <div className="list-page__details-title">
                      Date:
                    </div>
                    <div className="list-page__details-value">{item.Year}</div>
                  </div>
                  <div className="list-page__details">
                    <div className="list-page__details-title">Country:</div>
                    <div className="list-page__details-value">
                      {item.Country}
                    </div>
                  </div>
                  <div className="list-page__details">
                    <div className="list-page__details-title">Genre:</div>
                    <div className="list-page__details-value">{item.Genre}</div>
                  </div>
                  <div className="list-page__details-value">
                    <ul className="movie-item__info-list">

                      <li id="movie-item__info-item">
                        <button className="movie-item__add-button link-imdb">
                          <a
                            href={`https://www.imdb.com/title/${item.imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="list-page__link-imdb"
                          >
                            See more on imdb
                          </a>
                        </button>
                      </li>
                    </ul>

                  </div>
                </div>
                <img
                  src={item.Poster}
                  className="single-movie__poster"
                  alt={item.Title}
                />
              </li>
            );
          })}
        </ul>
      </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
  getList: (id) => dispatch(getList(id)),
  getMovieInfoByImdbID: (listMovies) =>
    dispatch(getMovieInfoByImdbID(listMovies)),
});

const mapStateToProps = (state) => {
  return {
    title: state.title,
    movieDetails: state.movieDetails,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
