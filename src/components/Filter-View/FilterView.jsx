/*import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { MovieCard } from "../moviecard/MovieCard";
import { MovieView } from "../movieview/MovieView";

export const FilterView = ({ movies, onMovieClick, genre }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  

  const filteredMovies = movies.filter(movie => movie.genre === genre);

  return (
    <Container>
        <Button onClick={() => setSelectedMovie(null)}>Genre</Button>
      <Row>
        {filteredMovies.map(movie => (
          <Col xl={12} md={11} className="d-flex justify-content-center" key={movie.id}>
            <MovieCard movie={movie} onMovieClick={onMovieClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
} */

import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../moviecard/MovieCard';

export const FilterView = ({ movies, onMovieClick }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Function to filter movies based on selected genre
  const filterMoviesByGenre = genre => {
    setSelectedGenre(genre);
  };

  // Filter movies based on selected genre
  const filteredMovies = selectedGenre ? movies.filter(movie => movie.genre === selectedGenre) : movies;

  return (
    <Container>
      {/* Display genre buttons */}
      <Row className="mb-3">
        <Col>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre(null)}>All</Button>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre('Action')}>Action</Button>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre('Romance')}>Romance</Button>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre('Drama')}>Drama</Button>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre('Comedy')}>Comedy</Button>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre('Thriller')}>Thriller</Button>
        </Col>
      </Row>

      {/* Display filtered movies */}
      <Row>
        {filteredMovies.map(movie => (
          <Col xl={3} md={4} sm={6} key={movie.id}>
            <MovieCard movie={movie} onMovieClick={onMovieClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
