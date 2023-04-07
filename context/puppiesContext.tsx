import { createContext } from 'react';
import { Puppy } from './types';
import { useState } from 'react';

export interface PuppiesContextProps {
  puppies: Puppy[];
  fetchPuppies: () => void;
  addPuppy: (puppy: Omit<Puppy, '_id'>) => Promise<void>;
  updatePuppy: (id: string, updates: Partial<Omit<Puppy, '_id'>>) => Promise<void>;
  deletePuppy: (id: string) => Promise<void>;
}

export const PuppiesContext = createContext<PuppiesContextProps>({
  puppies: [],
  fetchPuppies: () => {}, 
  addPuppy: async () => {},
  updatePuppy: async () => {},
  deletePuppy: async () => {},
});


interface PuppyProviderProps {
    children: React.ReactNode;
  }

export function PuppyProvider({ children }: PuppyProviderProps): JSX.Element {
    const [puppies, setPuppies] = useState<Puppy[]>([]);

    const fetchPuppies = async () => {
        try {
          const response = await fetch('/api/puppies');
          const data = await response.json();
          setPuppies(data);
        } catch (error) {
          console.error(error);
        }
      };
    
      const addPuppy = async (puppy: Omit<Puppy, '_id'>) => {
        try {
          const response = await fetch('/api/puppies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(puppy),
          });
          const data = await response.json();
          setPuppies([...puppies, data]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const updatePuppy = async (id: string, updates: Partial<Omit<Puppy, '_id'>>) => {
        try {
          const response = await fetch(`/api/puppies/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });
          const updatedPuppy = await response.json();
          setPuppies(prevPuppies =>
            prevPuppies.map(p => (p._id === id ? updatedPuppy : p))
          );
        } catch (error) {
          console.error(error);
        }
      };
    
      const deletePuppy = async (id: string) => {
        try {
          const response = await fetch(`/api/puppies/${id}`, {
            method: 'DELETE',
          });
          console.log(id)
          if(response.ok){
            setPuppies(prevPuppies => prevPuppies.filter(p => p._id !== id));
          } else {
            console.error(`Failed to delete puppy with ID ${id}`)
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <PuppiesContext.Provider
          value={{ puppies, fetchPuppies, addPuppy, updatePuppy, deletePuppy }}
        >
          {children}
        </PuppiesContext.Provider>
      );
    }