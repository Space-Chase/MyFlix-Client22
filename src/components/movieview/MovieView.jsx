import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick, onFavoriteClick, isFavorite, user, profile }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleFavoriteClick = () => {
    onFavoriteClick(movie);
    setAddedToFavorites(true); 
  };

  useEffect(() => {
    if (addedToFavorites) {
      const timer = setTimeout(() => {
        setAddedToFavorites(false); 
      }, 3000);
      return () => clearTimeout(timer); 
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
