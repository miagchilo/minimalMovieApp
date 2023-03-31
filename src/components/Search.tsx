'use client';
import { gql } from 'graphql-request';
import { client } from '../app/lib/client';
import React, { useState } from 'react';
import { Movies } from './Movie';

interface SearchResults {
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

const GET_MOVIE_BY_TITLE = gql`
  query SearchMovieByTitle($title: String!) {
    searchMovieByTitle(title: $title) {
      Poster
      Title
      Year
      Type
      imdbID
    }
  }
`;

function Search({ listId }: { listId: number }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(async () => {
        if (value) {
          const { searchMovieByTitle } = await client.request<{
            searchMovieByTitle: SearchResults[];
          }>(GET_MOVIE_BY_TITLE, {
            title: value,
          });
          const transformedResults = searchMovieByTitle.map((result) => {
            return {
              movie: {
                Poster: result.Poster,
                Title: result.Title,
                Year: result.Year,
                Type: result.Type,
                imdbID: result.imdbID,
              },
            };
          });
          setSearchResults(transformedResults);
        } else {
          setSearchResults([]);
        }
      }, 500)
    ); 
  };

  console.log(searchResults);
  return (
    <div className='flex flex-col'>
      <input
        placeholder='Search Movie...'
        value={searchQuery}
        onChange={handleSearch}
      />
      {searchResults.length > 0 ? (
        <Movies listId={listId} list={searchResults} />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Search;