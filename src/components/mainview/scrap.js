/*<Row>
      
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


import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    console.log(user);
    return (
        <Navbar bg="light" expand="lg" class="barnav">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Film Flock
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user ? (<Link to={`/`}>
                            <button className="back-button">new button1</button>
                        </Link>) : (
                            <Link to={`/`}>
                                <button className="back-button">new button2</button>
                            </Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
*/



 //console.log(userData.userData);

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
          throw new Error('No token found');
        }

        // Fetch user data with token
        const response = await fetch("https://nameless-basin-66959-08ab77b73096.herokuapp.com/users", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
*/



import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import MovieCard from './MovieCard'; // Import MovieCard component

const ProfileView = ({ user, movies, updateUser, deregisterUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Filter and set favorite movies when component mounts or user changes
  useEffect(() => {
    if (user.FavoriteMovies) {
      const userFavoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));
      setFavoriteMovies(userFavoriteMovies);
    }
  }, [user, movies]);

  // Function to handle adding a movie to favorites
  const addToFavorites = (movieId) => {
    // Update user's favorite movies in backend or state
    // For now, we just update the state
    const updatedFavoriteMovies = [...favoriteMovies, movies.find(m => m._id === movieId)];
    setFavoriteMovies(updatedFavoriteMovies);
  };

  // Function to handle removing a movie from favorites
  const removeFromFavorites = (movieId) => {
    // Update user's favorite movies in backend or state
    // For now, we just update the state
    const updatedFavoriteMovies = favoriteMovies.filter(m => m._id !== movieId);
    setFavoriteMovies(updatedFavoriteMovies);
  };

  return (
    <div>
      <h3>Update Profile</h3>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="button" onClick={updateUser}>
          Update
        </Button>
      </Form>
      
      <div className="favorite-movies">
        <h4>Favorite Movies:</h4>
        {favoriteMovies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isFavorite={true}
            removeFromFavorites={() => removeFromFavorites(movie._id)} // Pass remove function
          />
        ))}
      </div>

      <div className="deregister">
        <h6>To deregister your account click below</h6>
        <Button variant="danger" type="button" onClick={deregisterUser}>
          Deregister
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;




/*import { useState, useEffect } from "react";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";
import { LoginView } from "../loginview/LoginView";
import { SignupView } from "../signupview/SignUpView";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const onLoggedOut = () => {
  };

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
    <BrowserRouter>
      <NavigationBar
        user={user}
        setUser={setUser}
        setToken={setToken}
        onLoggedOut={onLoggedOut} />
      <Routes>
        <Route path="/login" element={!user ? (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </>
        ) : (
          <Navigate to="/" replace />
        )} />

        <Route path="/signup" element={!user ? (
          <>

            <SignupView />
          </>
        ) : (
          <Navigate to="/" replace />
        )} />

<Route path="/profile" element={!user ? (
          <>

            <SignupView />
          </>
        ) : (
          <ProfileView 
          user={user} 
          setUser={setUser}
          movies={movies}/>
        )} />

        

        <Route path="/" element={user ? (
          <>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            ) : movies.length === 0 ? (
              <div>The list is empty!</div>
            ) : (
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
            )}
            <div xl={12} md={11} className="d-flex justify-content-center">
              <Button
                className="logout-btn"
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
            </div>
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
      </Routes>
    </BrowserRouter>
  );
};
*/ // og main view



/*import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card>
      <div>
        <Row>
          <Col xl={12} md={11} className="d-flex justify-content-center">
            <div>
              <img src={movie.image} Width="500px" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={11}>
            <div>
              <span>Title: </span>
              <span>{movie.title}</span>
            </div>
            <div>
              <span>Director: </span>
              <span>{movie.director}</span>
            </div>
            <div>
              <span>Director Bio:</span>
              <span>{movie.directorBio}</span>
            </div>
            <div>
              <span>Genre:</span>
              <span>{movie.genre}</span>
            </div>
          </Col>
        </Row>
        <Button onClick={onBackClick}>Back</Button>
        </div>
        </Card>
      );
    };*/

   /* import React, { useState } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick, onFavoriteClick, isFavorite }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleFavoriteClick = () => {
    onFavoriteClick(movie);
    setAddedToFavorites(true); // Set the state to true when the movie is added to favorites
  };

  return (
    <Card>
      <div>
        <Row>
          <Col xl={12} md={11} className="d-flex justify-content-center">
            <div>
              <img src={movie.image} Width="500px" alt={movie.title} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={11}>
            <div>
              <span>Title: </span>
              <span>{movie.title}</span>
            </div>
            <div>
              <span>Director: </span>
              <span>{movie.director}</span>
            </div>
            <div>
              <span>Director Bio:</span>
              <span>{movie.directorBio}</span>
            </div>
            <div>
              <span>Genre:</span>
              <span>{movie.genre}</span>
            </div>
          </Col>
        </Row>
        <Button onClick={onBackClick}>Back</Button>
        <Button onClick={handleFavoriteClick} disabled={isFavorite}>
          {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
        </Button>
        {addedToFavorites && <Alert variant="success">Movie added to favorites!</Alert>} 
      </div>
    </Card>
  ); */ 