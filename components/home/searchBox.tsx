import { ChangeEvent } from 'react';

type SearchBoxProps = {
    placeholder?: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ placeholder, onChangeHandler} : SearchBoxProps ) => {
    return (
        <div className='flex justify-center pt-10'>
            <input 
                type="search" 
                placeholder={placeholder}
                onChange={onChangeHandler}
                className='border border-zinc-400 rounded-lg px-2 py-1'
            />
        </div>
    ) 
};

export default SearchBox;