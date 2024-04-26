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
  );
};*/


import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick, onFavoriteClick, isFavorite, user, profile }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleFavoriteClick = () => {
    onFavoriteClick(movie);
    setAddedToFavorites(true); // Set the state to true when the movie is added to favorites
  };

  useEffect(() => {
    if (addedToFavorites) {
      const timer = setTimeout(() => {
        setAddedToFavorites(false); // Reset the state after 2 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [addedToFavorites]);

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
        <Button onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        {addedToFavorites && <Alert variant="success">Favorites Updated!</Alert>} {/* Display message when added to favorites */}
      </div>
    </Card>
  );
};
