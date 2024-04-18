import { requestSearch } from '../../services/Api';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MoveListMessage from '../../components/MovieList/MovieList';
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviePage.module.css";

const MoviesPage = () => {
    const location = useLocation();
    const [searchResult, setSearchResult] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchData = async (queryWord) => {
        try {
            setSearchResult(await requestSearch(queryWord));
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ query: event.target.elements.searchInput.value.trim() });
    };

    useEffect(() => {
        const queryWord = searchParams.get('query');
        if (queryWord) {
            fetchData(queryWord);
        }
    }, [searchParams])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="searchInput" type="text" defaultValue={searchParams.get('query') || ''} />
                <button type="submit" className={css.buttonSearch}>Search</button>
            </form>
            <MovieList movieData={searchResult} backLinkRef={location} />
            {(searchResult === null || searchResult.results.length === 0) && <MoveListMessage movieData={searchResult} />}
        </div>
    );
};

export default MoviesPage;