import { gql } from 'graphql-request';
import { client } from '../../lib/client';
import { Movies } from '@/components/Movie';
import Search from '@/components/Search';


type MovieListParams = {
  params: { listId: string };
}

interface MovieListResponse {
  desc: string;
  finished: boolean;
  id: number;
  movie: {Title:string};
  imdb_id: string;
}


const GET_MOVIE_LIST_ITEMS = gql`
query GetMovieListItems($listId: Int!) {
    getMovieListItems(listId: $listId) {
      id
      imdb_id
      movie {
        Poster
        Title
        Year
        Type
        imdbID
      }
      movie_list_id
    }
  }
`;


export default async function MyListPage({ params: { listId } }: MovieListParams) {
  const { getMovieListItems } = await client.request<{ getMovieListItems: MovieListResponse[] }>(GET_MOVIE_LIST_ITEMS, {
    listId: parseInt(listId),
  });


  
  return (

    <div className="flex flex-col align-center justify-center p-16 sm:p-8">
      <div className="mx-auto">
        <h2 className="text-5xl mb-10">List items</h2>
        {getMovieListItems.length !== 0 ?
        <Movies listId={parseInt(listId)} list={getMovieListItems}/> :
        <p>No movies in this list yet</p>
        }
        <Search listId={parseInt(listId)}/>
    </div>
  </div>
  );
}