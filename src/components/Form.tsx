'use client';
import React from 'react'
import { client } from '../app/lib/client'
import { gql } from 'graphql-request';
import { MovieList } from '@/components/Lists';
import { MY_EMAIL_KEY } from '../constants/email';


const CREATE_MOVIE_LIST = gql`
  mutation CreateList($input: CreateListInput!) {
  createList(input: $input) {
    id
    name
  }
}
`;

type CreateListProps = {
  onCreate(list: MovieList): void;
};


function CreateList({ onCreate }: CreateListProps) {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await client.request<{ createList: MovieList }>(CREATE_MOVIE_LIST, {
      input: {
        name: formData.get('listName'),
        email: MY_EMAIL_KEY,
      },
    });

    onCreate(res.createList);
  };

  return (
    <div>
      <h2 className='text-7xl mt-10 uppercase'>Create new List</h2>
      <form className='flex justify-center mt-4' onSubmit={onSubmit}>
        <input
          type="text"
          id="listName"
          name="listName"
          className="input mr-1"
          placeholder="List name"
        />
        <button className='uppercase' type="submit">
          Create 
        </button>
      </form>
    </div>
  );
}

export default CreateList