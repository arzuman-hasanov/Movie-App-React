import React from "react";
import { connect } from "react-redux";
import "./MovieItem.css";
import { addFavList } from "../../state/actions/dataActions";

function MovieItem(props) {
  const ifIdInFavorites = (imdbID) => {
    const active = props.favoriteList.find((item) => {
      return item.imdbID === imdbID;
    });
    if (active) {
      return true;
    }
  };

  const { Title, Year, Poster, imdbID } = props;
  return (
    <article className="movieItem">
      <img className="movieImg" src={Poster} alt={Title} />
      <div className="movie-item__info">
        <h3 className="movieTitle">
          {Title}&nbsp;({Year})
        </h3>
        <button
          style={{
            opacity: ifIdInFavorites(imdbID) ? "0.7" : "1",
          }}
          type="button"
          className="movieItemAddButton"
          onClick={() => {
            props.addFavList(imdbID);
          }}
          disabled={ifIdInFavorites(imdbID)}
        >
          {ifIdInFavorites(imdbID) ? `Movie added to cart` : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavList: (imdbID) => {
      dispatch(addFavList(imdbID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
