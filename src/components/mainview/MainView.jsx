import { useState } from "react";
import {MovieCard} from "../moviecard/MovieCard";
import {MovieView} from "../movieview/MovieView";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      image: "/Users/chasepolyak/careerfoundry/MyFlix-Client2/src/components/mainview/img/TheDarkKnight.jpg",
     director: "Christopher Nolan",
     genre: "Action",
    },
    {
      id: 2,
      title: "Dunkirk",
      image:
        "",
     director: "Christopher Nolan",
     genre: "Drama"
    },
    {
      id: 3,
      title: "Lady Bird",
      image:
        "",
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