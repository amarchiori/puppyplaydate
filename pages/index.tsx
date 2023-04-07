import React, { useContext, useEffect, useState } from 'react';
import { PuppiesContext } from '../context/puppiesContext';
import { Puppy } from '../context/types';
import CardList from '../components/home/cardList';
import SearchBox from '../components/home/searchBox';

const Home = () => {
  const { puppies, fetchPuppies } = useContext(PuppiesContext);
  const [searchState, setSearchState] = useState<string>('');

  useEffect(() => {
    fetchPuppies();
  }, [fetchPuppies]);

  const handleSearchState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(event.target.value);
  };

  const filteredPuppies: Puppy[] = puppies.filter(
    (puppy) =>
      puppy.state.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div>
      <SearchBox 
            onChangeHandler={handleSearchState}
            placeholder='Search by state...'
          />
      <CardList puppies={filteredPuppies}/>
    </div>
  );
};

export default Home;