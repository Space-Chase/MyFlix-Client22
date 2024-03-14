import propTypes from "prop-types"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Container>
      <Row classname="justify-content-md-center">
      <Col md={3}>
        <Card>
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
    </Card>
    </Col>
    </Row>
    </Container>
  );
};




MovieCard.propTypes = {
  movie: propTypes.shape ({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    director: propTypes.string.isRequired,
    directorBio: propTypes.string.isRequired,
    genre: propTypes.string.isRequired,
    image: propTypes.string




  })




}