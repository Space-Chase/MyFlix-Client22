import React, { useState, useEffect } from "react";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";
import { LoginView } from "../loginview/LoginView";
import { SignupView } from "../signupview/SignUpView";
import { ProfileView } from "../profile-view/profile-view";
import { Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("https://nameless-basin-66959-08ab77b73096.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((doc) => {
            return {
              id: doc._id,
              title: doc.title,
              director: doc.details.director,
              directorBio: doc.director_bio,
              genre: doc.details.genre,
              image: doc.Image,
            };
          });

          setMovies(moviesFromApi);
        });
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const toggleFavorite = async (movie) => {
    const storedToken = localStorage.getItem('token');
    const isFavorite = user.FavoriteMovies.includes(movie.id);
    const method = isFavorite ? 'DELETE' : 'POST';
    const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user._id}/favorites/${movie.id}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setNotification("Movie added to favorites!");
      setTimeout(() => {
        setNotification(null);
      }, 2000); 
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} handleLogout={handleLogout} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route path="/login" element={!user ? <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <SignupView /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={user ? <ProfileView user={user} setUser={setUser} movies={movies} setSelectedMovie={setSelectedMovie}  /> : <Navigate to="/login" replace />} />
        <Route path="/" element={user ? (
          <>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                onFavoriteClick={(movie) => toggleFavorite(movie)}
                isFavorite={user.FavoriteMovies.includes(selectedMovie.id)}
              />
            ) : movies.length === 0 ? (
              <div>The list is empty!</div>
            ) : (
              <div>
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
                ))}
              </div>
            )}
            <div className="d-flex justify-content-center mt-3">
              <Button
                className="logout-btn"
                variant="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
      </Routes>
    </BrowserRouter>
  );
};
