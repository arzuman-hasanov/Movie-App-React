import React, {  useEffect } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList, getMovieInfoByImdbID } from "../../state/actions/dataActions";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

function ListPage(props) {
 
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
        <h1 className="listp-title">{props.title}</h1>
        <ul className="ul">
          {props.movieDetails.map((item) => {
            return (
              <li key={item.imdbID} className="list-page-movie list">
                
                <div className="movie-info">
                  <h3 className="movieTitle">{item.Title}</h3>
                  <h4 className="movie-about">About movie</h4>
                  <div className="details">
                    <div className="details-title">
                      Date:
                    </div>
                    <div className="details-value">{item.Year}</div>
                  </div>
                  <div className="details">
                    <div className="details-title">Country:</div>
                    <div className="details-value">
                      {item.Country}
                    </div>
                  </div>
                  <div className="details">
                    <div className="details-title">Genre:</div>
                    <div className="details-value">{item.Genre}</div>
                  </div>
                  <div className="details-value">
                    <ul className="info-list">

                      <li id="info-item">
                        <button className="movieItemAddButton link-imdb">
                          <a
                            href={`https://www.imdb.com/title/${item.imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="listp-link-imdb"
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
                  className="movie-img"
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
