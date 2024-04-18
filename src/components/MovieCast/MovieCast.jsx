import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestCast } from "../../services/Api";

import css from './MovieCast.module.css';

const MovieCast = ({ }) => {
  
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState(null);

  const fetchData = async (queryWord = '') => {
    try {
      const movieData = await requestCast(queryWord);
      setMovieData(movieData);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    fetchData(movieId);
  }, [movieId]);


  return (
    <div className={css.container}>
      <ul>
        {movieData?.cast?.map(actor => (
          <li key={actor.id}>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieCast;