import React from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

function MainPage() {
        return (
            <div className="mainPage">
                <Header />
                <main className="mainPageContent">
                    <section className="mainPageMainSection">
                        <div className="mainPageSearchBox">
                            <SearchBox />
                        </div>
                        <div className="mainPageMovies">
                            <Movies />
                        </div>
                    </section>
                    <aside className="mainPageFavorites">
                        <Favorites />
                    </aside>
                </main>
            </div>
        )
}
 
export default MainPage;