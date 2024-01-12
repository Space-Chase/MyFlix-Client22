export const MovieView = ({ movie, onBackClick }) => {
  console.log (movie)
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
