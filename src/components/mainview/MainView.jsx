import { useState, useEffect } from "react";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";
import { LoginView } from "../loginview/LoginView";
import { SignupView } from "../signupview/SignUpView";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState();
  const [token, setToken] = useState(null); 
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
  }, []); 

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

