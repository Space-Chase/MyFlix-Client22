import propTypes from "prop-types";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Container>
    <Row>
      <Col xl={12} md={11} className="d-flex justify-content-center">
        <Card>
          <Button
            onClick={() => {
              onMovieClick(movie);
            }}
          >
            {movie.title}
          </Button>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};




MovieCard.propTypes = {
  movie: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    director: propTypes.string.isRequired,
    directorBio: propTypes.string.isRequired,
    genre: propTypes.string.isRequired,
    image: propTypes.string
  }),
  onFavoriteClick: propTypes.func

};