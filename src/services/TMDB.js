import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//const page = 1;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //GEt Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //Get Movies
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        console.log(genreIdOrCategoryName);
        //Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&Page=${page}&api_key=${tmdbApiKey}`;
        }
        //Movie by Categories
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          //console.log(genreIdOrCategoryName);
          return `movie/${genreIdOrCategoryName}?Page=${page}&api_key=${tmdbApiKey}`;
        }
        //Movie by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&Page=${page}&api_key=${tmdbApiKey}`;
        }
        //console.log(genreIdOrCategoryName, page);
        //Default get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //Get Movie
    getMovie: builder.query({
      query: (id) => {
        return `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`;
      },
    }),
    //Get User Specific Lists
    getRecommendation: builder.query({
      query: ({ movie_id, list }) => {
        return `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`;
      },
    }),
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
///movie/{movie_id}/credits
