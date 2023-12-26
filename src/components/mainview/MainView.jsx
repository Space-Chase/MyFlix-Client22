import { useState } from "react";
import {MovieCard} from "../moviecard/MovieCard";
import {MovieView} from "../movieview/MovieView";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      image: "https://moviesmedia.ign.com/movies/image/object/752/752133/DomBatpod_OneSheet.jpg?width=300&auto=webp&dpr=2",
     director: "Christopher Nolan",
     genre: "Action",
    },
    {
      id: 2,
      title: "Dunkirk",
      image:
        "https://assets1.ignimgs.com/2017/06/07/dunkirk-ver2-xlg-1496872985565.jpg?width=300&auto=webp&dpr=2",
     director: "Christopher Nolan",
     genre: "Drama"
    },
    {
      id: 3,
      title: "Lady Bird",
      image:
        "https://assets1.ignimgs.com/2017/11/27/lady-bird-ver2-xlg-1511811839534.jpg?width=300&auto=webp&dpr=2",
     director: "Greta Gerwig",
     genre: "Comedy",
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((book) => (
        <MovieCard
          key={movies.id}
          movie={book}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};