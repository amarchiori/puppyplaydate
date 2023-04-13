import React, { useContext, useEffect, useState } from 'react';
import { PuppiesContext } from '../context/puppiesContext';
import { IPuppy } from '../context/puppy';
import CardList from '../components/home/cardList';
import SearchBox from '../components/home/searchBox';

const Home = () => {
  const { puppies, fetchPuppies } = useContext(PuppiesContext);
  const [searchState, setSearchState] = useState<string>('');

  useEffect(() => {
    fetchPuppies();
  }, []);

  const handleSearchState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(event.target.value);
  };

  const filteredPuppies: IPuppy[] = puppies.filter(
    (puppy) =>
      puppy.state.includes(searchState)
  );

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
        <SearchBox 
          onChangeHandler={handleSearchState}
          placeholder='Search by state...'
        />
        <CardList puppies={filteredPuppies}/>
      </div>
    </div>
  );
};

export default Home;