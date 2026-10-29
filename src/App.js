import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch the movies data from the JSON file
    // and update the state with the fetched data
    // .then is used to handle the promise returned by fetch and response.json
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    )
  }

  return (
    <div className="App">
      <div className="container">
        <Header />

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<MoviesGrid watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />} ></Route>
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />} ></Route>
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
