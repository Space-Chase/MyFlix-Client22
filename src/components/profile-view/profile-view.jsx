import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";


export const ProfileView = ({ user, setUser, movies}) => {
  const [userData, setUserData] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [notification, setNotification] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('token');
        const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          setFavoriteMovies(userData.FavoriteMovies);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.Username]);

  const updateUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUserData(updatedUser);
        setNotification("Profile updated successfully!");
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const deregisterUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } else {
        console.error('Failed to deregister user');
      }
    } catch (error) {
      console.error('Error deregistering user:', error);
    }
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
       setSelectedMovie(null);
    setFavoriteMovies(updatedUser.FavoriteMovies);
    }
  };

  return (
    <Container>
      {selectedMovie ?
        <MovieView
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onFavoriteClick={toggleFavorite}
          isFavorite={favoriteMovies.includes(selectedMovie.id)}
          onBackClick={() => setSelectedMovie(null)}
        />
      :(
      
        userData && Object.keys(userData).length > 0 && (
          <div>
            {notification && <Alert variant="success">{notification}</Alert>}
            <h2>User Profile</h2>
            <p>Name: {userData.Username}</p>
            <p>Email: {userData.Email}</p>
            <p>Birthday: {userData.Birthday}</p>

            <h3>Favorites</h3>
            <Row>
              {favoriteMovies.map(movieId => {
                const movie = movies.find(m => m.id === movieId);
                if (movie) {
                  return (
                    <Col key={movie.id} xs={6} md={4} lg={3}>
                      <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                      />
                    </Col>
                  );
                } else {
                  console.warn(`Movie with ID ${movieId} not found in the movies array.`);
                  return null; 
                }
              })}
            </Row>

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

            <div className="deregister">
              <h6>To deregister your account click below</h6>
              <Button variant="danger" type="button" onClick={deregisterUser}>
                Deregister
              </Button>
            </div>
          </div>
        )
      )}
    </Container>
  );
};

export default ProfileView;


