import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
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
};
