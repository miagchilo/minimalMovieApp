import React from 'react'
import { gql } from 'graphql-request';
import { client } from '../../lib/client';
import Image from 'next/image';


type MovieDetailsParam = {
  params: { imdbId: string };
}

interface MovieDetails {
  Actors: string;
  Country: string;
  Director: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Year: string;
  Runtime: string;
  Title: string;
  Language: string;
  imdbRating: string;
}

const GET_MOVIE_DETAILS = gql`
 query SearchMovieById($searchMovieByIdId: String!) {
  searchMovieById(id: $searchMovieByIdId) {
    Actors
    Country
    Director
    Genre
    Plot
    Poster
    Year
    Runtime
    Title
    Language
    imdbRating
  }
}
`;

async function  page({ params: { imdbId } }: MovieDetailsParam) {
  const { searchMovieById } = await client.request<{ searchMovieById: MovieDetails }>(GET_MOVIE_DETAILS, {
    searchMovieByIdId: imdbId,
  });
  return (
    <div className='container' style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '2rem' }}>
            <Image src={searchMovieById.Poster} height={600} width={400} alt='' className='image'/>
        </div>
        <div className='info'>
            <h1 className='text-4xl	'>{searchMovieById.Title}</h1>
            <h3>{searchMovieById.Plot}</h3>
            <h4>Rating: {searchMovieById.imdbRating}</h4>
            <h4>Released: {searchMovieById.Year}</h4>
            <h4>Actors: {searchMovieById.Actors}</h4>
            <h4>Genre: {searchMovieById.Genre}</h4>
            <h4>Directors: {searchMovieById.Director}</h4>
        </div>
    </div>
  )
}

export default page