'use client';
import Link from 'next/link';
import Form from './Form'
import { useState } from 'react';

export type MovieList = {
  id: number;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: MovieList[];
};

export const Lists = ({ list = [] }: MyListsProps) => {
  const [MovieLists, setMovieLists] = useState<MovieList[]>(list);

  const onCreateHandler = (newMovieList: MovieList) => {
    setMovieLists([...MovieLists, newMovieList]);
  };

  return (
    <div>
      <h1 className='text-9xl uppercase  '>{MovieLists.length > 0 ? 'My lists' : 'No lists yet!'}</h1>
      <ul>
        {MovieLists.map((item) => (
          <li key={item.id}>
            <Link className='hover:bg-green-200 transition duration-500 ease-in-out uppercase '
              href={'/lists/'+item.id.toString()}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <Form onCreate={onCreateHandler} />
    </div>
  );
};