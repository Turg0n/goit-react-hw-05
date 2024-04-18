import axios from "axios";

const APITOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UyZGYzNDlkMTIyOGNhM2EyNzJlNjNmZjg4ZDQ0OCIsInN1YiI6IjY2MjBmMjJjNzg1NzBlMDE0YTBmYzZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YdQ54j6uw3xZXVIBUT2dgVlwcH9XoWid4nLthyLXB7I';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${APITOKEN}`,
  }
});


export const requestTrandingToday = async () => {
  const { data } = await instance.get(
    `/3/trending/movie/day?language=en-US`
  );
  return data;
};

export const requestSearch = async (queryWord) => {

  const { data } = await instance.get(
    `/3/search/movie?query=${queryWord}&include_adult=false&language=en-US&page=1`
  );
  return data;
};

export const requestDetails = async (queryWord) => {

  const { data } = await instance.get(
    `/3/movie/${queryWord}?language=en-US`
  );
  return data;

};

export const requestCast = async (queryWord) => {

  const { data } = await instance.get(
    `/3/movie/${queryWord}/credits?language=en-US`
  );
  return data;

};


export const requestReviews = async (queryWord) => {

  const { data } = await instance.get(
    `/3/movie/${queryWord}/reviews?language=en-US&page=1`
  );
  return data;

};