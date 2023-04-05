import clientPromise from '../lib/mongodb'
import { GetServerSideProps } from 'next';
import { useState, useEffect, ChangeEvent } from 'react';
import SearchBox from '../components/home/searchBox';
import CardList from '../components/home/cardList';


type Props = {
  users: User[];
};

export type User = {
  puppy: {
    dog_name: string;
    tagline: string;
    age: string;
    sex: string;
    breed: string;
    intro: string;
  };
  _id: string;
  email: string;
  password: string;
  city: string;
  state: string;
};

export default function Home({ users }: Props ): JSX.Element{
  const [searchField, setSearchField] = useState('');
  const [puppies, setPuppies ] = useState<User[]>(users);
  const [filteredPuppies, setFilteredPuppies] = useState(puppies);

  useEffect(() => {
    const newFilteredPuppies = puppies.filter((puppy) => {
      return puppy.state.toLocaleLowerCase().includes(searchField)
    })
    setFilteredPuppies(newFilteredPuppies);
  }, [puppies, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      <div>

          <SearchBox 
            onChangeHandler={onSearchChange}
            placeholder='search by state'
          />
          <CardList users={filteredPuppies}/>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("puppies");
  
    const users = await db
        .collection("users")
        .find({})
        .sort({ metacritic: -1 })
        .toArray();
  
    return {
        props: { users: JSON.parse(JSON.stringify(users)) },
    };
  } catch (e) {
      console.error(e);
      return {
        props: { users: [] },
      }
  }
}