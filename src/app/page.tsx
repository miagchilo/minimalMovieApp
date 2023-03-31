import { Lists, MovieList } from '@/components/Lists';
import { gql } from 'graphql-request';
import { client } from '../app/lib/client';
import { MY_EMAIL_KEY } from '../constants/email';


const GET_MOVIE_LISTS = gql`
query GetMovieLists($email: String!) {
  getMovieLists(email: $email) {
    name
    id
  }
}
`;

export default async function Home() {
  const { getMovieLists } = await client.request<{ getMovieLists: MovieList[] }>(GET_MOVIE_LISTS, {
    email: MY_EMAIL_KEY,
  });

  return (
    <div className="flex justify-center">
      <div className="flex">
        <Lists list={getMovieLists ?? []} />
      </div>
    </div>
  );
}