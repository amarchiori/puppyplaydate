import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const client = await clientPromise
  const db = client.db("puppyplaydate");
  const puppyCollection = db.collection('puppies');
  

    try {
      const puppies = await puppyCollection.find().toArray();
      res.status(200).json(puppies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching puppies.' });
    }
  }
      
      
      
      
      
      