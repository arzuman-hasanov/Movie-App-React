import React, { useState } from "react";

import "./Favorites.css";
import { connect } from "react-redux";
import {
  removeMovieFromFavoriteList,
  postList,
} from "../../state/actions/dataActions";
import { Link } from "react-router-dom";

function Favorites(props) {
  const [state, setState] = useState({
    isSbm: false,
    title: "New List",
    disabled: false
  });

  const favoriteChange = (e) => {
    setState({ title: e.target.value });
  };
  const getImdbIDArray = () => {
    let favoritesIDArray = props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  const saveListHandler = () => {
    if(!state.title.length){
      setState(prev=>({...prev, disabled: true }));
    }else {
      setState(prev=>({...prev, isSbm: true }));
      props.postList(state.title, getImdbIDArray());
    }
  };
  const { title, isSbm } = state;
  return (
    <div className="fav-container">
      <input
        value={title}
        className="fav_name"
        onChange={favoriteChange}
        disabled={state.isSbm}
      />
      <ul className="fav_list">
        {props.favoriteList.map((item) => {
          return (
            <li key={item.imdbID}>
              <div className="block">
                <p className="movie-name">
                  {item.Title} ({item.Year})
                </p>
                <button
                  title="Remove"
                  className="remove-fav-movie"
                  onClick={() => props.removeMovieFromFavoriteList(item.imdbID)}
                >
                  ✖
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {!isSbm ? (
        <button
          type="button"
          className="fav_save"
          onClick={saveListHandler}
          
        >
          Save List
        </button>
      ) : (
        <button type="button" className="fav_save">
          <Link
            to={"/list/" + props.listID}
            target="_blank"
            className="link-to__list"
          >
            Your favorite movies
          </Link>
        </button>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
