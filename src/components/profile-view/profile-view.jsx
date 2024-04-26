/*import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
export const ProfileView = ({ user, setUser }) => {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  const updateUser = async () => {
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
    }
  };

  const deregisterUser = async () => {
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
    }
  };

  return (
    <div>
    </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && (
          <div>
            <h2>User Profile</h2>
            <p>Name: {userData.Username}</p>
            <p>Email: {userData.Email}</p>
            <p>Birthday: {userData.Birthday}</p>
            <p>Favorites: {userData.FavoriteMovies}</p>

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

            <div classname="deregister">
            <h6>To deregister your acount click below</h6>
            <Button variant="danger" type="button" onClick={deregisterUser}>
              Deregister
            </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};*/


//second attempt 

/*import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../moviecard/MovieCard";

export const ProfileView = ({ user, setUser, movies }) => {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const updateUser = async () => {
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
    }
  };

  const deregisterUser = async () => {
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
    }
  };

  const toggleFavorite = async (movie) => {
    const storedToken = localStorage.getItem('token');
    const isFavorite = user.FavoriteMovies.includes(movie.id);
    const updatedFavorites = isFavorite
      ? user.FavoriteMovies.filter(id => id !== movie.id)
      : [...user.FavoriteMovies, movie.id];

    const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        FavoriteMovies: updatedFavorites
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setUserData(updatedUser);
    }
  };

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && (
          <div>
            <h2>User Profile</h2>
            <p>Name: {userData.Username}</p>
            <p>Email: {userData.Email}</p>
            <p>Birthday: {userData.Birthday}</p>

            <h3>Favorites</h3>
            <Row>
              {favoriteMovies.map(movie => (
                <Col key={movie.id} xs={6} md={4} lg={3}>
                  <MovieCard 
                    movie={movie} 
                    onFavoriteClick={toggleFavorite}
                  />
                </Col>
              ))}
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

            <div classname="deregister">
              <h6>To deregister your account click below</h6>
              <Button variant="danger" type="button" onClick={deregisterUser}>
                Deregister
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}; 

import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../moviecard/MovieCard";

export const ProfileView = ({ user, setUser, movies }) => {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const updateUser = async () => {
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
    }
  };

  const deregisterUser = async () => {
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
    }
  };

  const toggleFavorite = async (movie) => {
    const storedToken = localStorage.getItem('token');
    const isFavorite = user.FavoriteMovies.includes(movie.id);
    const updatedFavorites = isFavorite
      ? user.FavoriteMovies.filter(id => id !== movie.id)
      : [...user.FavoriteMovies, movie.id];

    const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        FavoriteMovies: updatedFavorites
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setUserData(updatedUser);
    }
  };

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && (
          <div>
            <h2>User Profile</h2>
            <p>Name: {userData.Username}</p>
            <p>Email: {userData.Email}</p>
            <p>Birthday: {userData.Birthday}</p>

            <h3>Favorites</h3>
            <Row>
              {favoriteMovies.map(movie => (
                <Col key={movie.id} xs={6} md={4} lg={3}>
                  <MovieCard 
                    movie={movie} 
                    onFavoriteClick={toggleFavorite}
                  />
                </Col>
              ))}
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
    </div>
  );
};


*/




import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { MovieCard } from "../moviecard/MovieCard";

export const ProfileView = ({ user, setUser, movies }) => {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [notification, setNotification] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

  // clear up 
  const toggleFavorite = async (movie) => {
    try {
      const storedToken = localStorage.getItem('token');
      const isFavorite = favoriteMovies.includes(movie.id);
      const updatedFavorites = isFavorite
        ? favoriteMovies.filter(id => id !== movie.id)
        : [...favoriteMovies, movie.id];

      const response = await fetch(`https://nameless-basin-66959-08ab77b73096.herokuapp.com/users/${user.Username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          FavoriteMovies: updatedFavorites
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUserData(updatedUser);
        setFavoriteMovies(updatedFavorites);
        setNotification("Movie added to favorites!");
        setTimeout(() => {
          setNotification(null);
        }, 3000); // Clear notification after 3 seconds
      } else {
        console.error('Failed to toggle favorite movie');
      }
    } catch (error) {
      console.error('Error toggling favorite movie:', error);
    }
  };

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && (
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
                        isFavorite={true} // Movie is always a favorite if it's displayed in the profile
                      />
                    </Col>
                  );
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

