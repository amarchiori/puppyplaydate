import { createContext } from 'react';
import { IPuppy } from '../context/puppy'
import { useState } from 'react';

export interface PuppiesContextProps {
  puppies: IPuppy[];
  fetchPuppies: () => void;
  addPuppy: (data: Partial<Omit<IPuppy, '_id' | 'ownerID'>>, owner: string) => Promise<void>;
  updatePuppy: (id: string, updates: Partial<Omit<IPuppy, '_id'>>) => Promise<void>;
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
    session: any;
  }

export function PuppyProvider({ children, session }: PuppyProviderProps): JSX.Element {
    const [puppies, setPuppies] = useState<IPuppy[]>([]);

    const fetchPuppies = async () => {
        try {
          const response = await fetch('/api/puppies');
          const data = await response.json();
          setPuppies(data);
        } catch (error) {
          console.error(error);
        }
      };
    
      const addPuppy = async (data: Partial<Omit<IPuppy, '_id' | 'ownerID'>>, owner: string) => {
        const puppyData = {
          ...data,
          ownerID: owner
        };
        try {
          const response = await fetch('/api/puppies/add-puppy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(puppyData),
          });
          const data = await response.json();
          setPuppies([...puppies, data]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const updatePuppy = async (id: string, updates: Partial<Omit<IPuppy, '_id'>>) => {
        try {
          const response = await fetch(`/api/puppies/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...updates, ownerID: session.user.id }),
          });
          const updatedPuppy = await response.json();
          setPuppies(prevPuppies =>
            prevPuppies.map(p => (p.id === id ? updatedPuppy : p))
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
            setPuppies(prevPuppies => prevPuppies.filter(p => p.id !== id));
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