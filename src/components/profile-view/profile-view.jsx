/*import React, { useState, useEffect } from 'react';

export const ProfileView = (user, setUser) => {
const [userData, setUserData] = useState(user.user);
  const [loading, setLoading] = useState(false);
 console.log(user);
 //console.log(userData.userData);

  useEffect(() => {
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
            <p>Favorites: {userData.FavoriteMovies}</p>
          </div>
        )
      )}
    </div>
  );
}; */

import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

export const ProfileView = ({ user, setUser }) => {
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

            <h3>Deregister</h3>
            <Button variant="danger" type="button" onClick={deregisterUser}>
              Deregister
            </Button>
          </div>
        )
      )}
    </div>
  );
};