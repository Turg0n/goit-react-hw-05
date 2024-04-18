import { requestTrandingToday } from "../../services/Api";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const trendingData = await requestTrandingToday();
      setMovieData(trendingData);
    } catch (error) {
      console.error('Виникла помилка:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={css.MovieListWrap}>
      <h2>Tranding today</h2>
      <MovieList movieData={movieData} backLinkRef={location}/>
    </div>
  );
};

export default HomePage;