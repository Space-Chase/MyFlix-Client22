import { useState, useEffect } from "react";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";
import { LoginView } from "../loginview/LoginView";
import { SignupView } from "../signupview/SignUpView";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  return (
    <Row>
      {!user ? (
        <Row>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <SignupView />
        </Row>
      ) : selectedMovie ? (
        <Row>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Row>
      ) : movies.length === 0 ? (
        <Row>
          <div>The list is empty!</div>
        </Row>
      ) : (
        <Row>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </Row>
      )}
      {user && (
        <Row>
          <Col xl={12} md={11} className="d-flex justify-content-center">
            <Button
              class="logout-btn"
              type="submit"
              variant="secondary"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      )}
    </Row>
  );
};
