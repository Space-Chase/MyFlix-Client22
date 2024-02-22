import propTypes from "prop-types"
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
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