import { createContext } from 'react';
import { IPuppy } from '../context/puppy'
import { useState } from 'react';

export interface PuppiesContextProps {
  puppies: IPuppy[];
  userPuppies: IPuppy[];
  refreshUserPuppies: (ownerID: string) => Promise<void>;
  fetchPuppies: () => void;
  addPuppy: (data: Partial<Omit<IPuppy, '_id' | 'ownerID'>>, ownerID: string) => Promise<void>;
  updatePuppy: (id: string, updates: Partial<Omit<IPuppy, '_id'>>) => Promise<void>;
  deletePuppy: (id: string) => Promise<void>;
}

export const PuppiesContext = createContext<PuppiesContextProps>({
  puppies: [], 
  userPuppies: [],
  refreshUserPuppies: async () => {},
  fetchPuppies: () => {}, 
  addPuppy: async () => {},
  updatePuppy: async () => {},
  deletePuppy: async () => {},
});


interface PuppyProviderProps {
    children: React.ReactNode;
  }

export function PuppyProvider({ children }: PuppyProviderProps): JSX.Element {
    const [puppies, setPuppies] = useState<IPuppy[]>([]);
    const [userPuppies, setUserPuppies] = useState<IPuppy[]>([]);

    const refreshUserPuppies = async (ownerID: string): Promise<void> => {
      try{
        const response = await fetch(`/api/puppies/owner?ownerID=${ownerID}`);
        if (response.status === 204) {
          setUserPuppies([]);
          return;
        }
        if(response.ok){
          const data = await response.json();
          setUserPuppies(data);
        } else {
          console.error(`No Puppies found from owner ${ownerID}`)
        }
      } catch (error) {
        console.log(error)
      }
    };


    const fetchPuppies = async (): Promise<void> => {
        try {
          const response = await fetch('/api/puppies');
          if (response.ok) {
            const data = await response.json();
            setPuppies(data);
          } else {
            throw new Error(`Failed to fetch puppies: ${response.status} ${response.statusText}`)
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const addPuppy = async (
        data: Partial<Omit<IPuppy, '_id' | 'ownerID'>>, 
        ownerID: string
        ): Promise<void> => {
        const puppyData = {
          ...data,
          ownerID: ownerID
        };
        console.log('puppyData:', puppyData)
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
          setUserPuppies([...userPuppies, data]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const updatePuppy = async (id: string, updates: Partial<Omit<IPuppy, '_id'>>): Promise<void> => {
        try {
          const response = await fetch(`/api/puppies/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...updates }),
          });
          const updatedPuppy = await response.json();
          setPuppies(prevPuppies =>
            prevPuppies.map(p => (p.id === id ? updatedPuppy : p))
          );
          setUserPuppies(prevPuppies =>
            prevPuppies.map(p => (p.id === id ? updatedPuppy : p))
          );
        } catch (error) {
          console.error(error);
        }
      };
    
      const deletePuppy = async (id: string): Promise<void> => {
        try {
          const response = await fetch(`/api/puppies/${id}`, {
            method: 'DELETE',
          });
          console.log(id)
          if(response.ok){
            setPuppies(prevPuppies => prevPuppies.filter(p => p.id !== id));
            setUserPuppies(prevPuppies => prevPuppies.filter(p => p.id !== id));
          } else {
            console.error(`Failed to delete puppy with ID ${id}`)
          }
        } catch (error) {
          console.error(error);
        }
      };


      return (
        <PuppiesContext.Provider
          value={{ puppies, refreshUserPuppies, userPuppies, fetchPuppies, addPuppy, updatePuppy, deletePuppy }}
        >
          {children}
        </PuppiesContext.Provider>
      );
    }