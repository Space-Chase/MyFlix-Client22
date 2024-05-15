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

  let genreList = [...new Set(movies.map(movie => movie.genre))];

  return (
    <Container>
      {/* Display genre buttons */}
      <Row className="mb-3 d-flex flex-column justify-content-center align-items-start">
        <Col>
          <Button variant="outline-primary" onClick={() => filterMoviesByGenre(null)}>All</Button>

          {genreList.map((genre) => (
            <Button variant="outline-primary" onClick={() => filterMoviesByGenre(genre)}>{genre}</Button>
          ))}
        </Col>
      </Row>

      {/* Display filtered movies */}
      <Row>
        {filteredMovies.map(movie => (
          <Col xl={3} md={12} sm={6} key={movie.id}>
            <MovieCard movie={movie} onMovieClick={onMovieClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
