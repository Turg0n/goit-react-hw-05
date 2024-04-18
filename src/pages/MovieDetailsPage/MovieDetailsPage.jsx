import { requestDetails } from "../../services/Api";
import { useParams, useLocation, Link, Routes, Route } from 'react-router-dom';
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import Loader from '../../components/Loader/Loader';
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"));
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [genres, setGenres] = useState(null);
  const [imagePatch, setImagePatch] = useState(null);

  const fetchData = async (TypeOfQuery, queryWord = '') => {
    try {
      if (TypeOfQuery === 'details' && queryWord) {
        const movieData = await requestDetails(queryWord);
        setMovieData(movieData);
        setGenres(movieData.genres.map(genre => genre.name).join(', '));
        setImagePatch(`https://image.tmdb.org/t/p/w400${movieData.poster_path}`);
        return;
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    fetchData('details', movieId);
  }, [movieId]);

  return (
    <div>
      <Link className={css.backLink} to={backLinkRef.current}>⬅ Go Back</Link>
      <div className={css.movieCard}>
        <img src={imagePatch} alt={"poster from movie " + movieData?.title} className={css.movieImage} />
        <div className={css.movieDescription}>
          <p className={css.title}>{movieData?.title}</p>
          <p><b>ID: </b> {movieId}</p>
          <p><b>Release date: </b>{movieData?.release_date}</p>
          <p><b>Vote average: </b>{movieData?.vote_average}</p>
          <p><b>Overview: </b>{movieData?.overview}</p>
          <p><b>Genres: </b>{genres}</p>
        </div>
      </div>

      <p>Additional information</p>
      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;