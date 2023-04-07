import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  const client = await clientPromise;
  const db = client.db("puppyplaydate");
  const puppyCollection = db.collection('puppies');

  // switch (method) {
  //   case 'GET':
  //     if (id) {
  //       const puppy = await puppyCollection.findOne({ _id: new ObjectId(id as string) });
  //       res.status(200).json(puppy);
  //     } else {
  //       const puppies = await puppyCollection.find().toArray();
  //       res.status(200).json(puppies);
  //     }
  //     break;
  //   case 'POST':
  //     const { 
  //       city,
  //       state,
  //       age,
  //       dog_name,
  //       tagline,
  //       intro,
  //       gender,
  //     } = body;
  //     const { insertedId } = await puppyCollection.insertOne({ 
  //       city,
  //       state,
  //       age,
  //       dog_name,
  //       tagline,
  //       intro,
  //       gender,
  //     });
  //     res.status(201).json({
  //        _id: insertedId, 
  //         city,
  //         state,
  //         age,
  //         dog_name,
  //         tagline,
  //         intro,
  //         gender, 
  //       });
  //     break;
    // case 'PUT':
    //   const { 
    //       city: updatedCity,
    //       state: updatedState,
    //       age: updatedAge,
    //       dog_name: updatedDogName,
    //       tagline: updatedTagline,
    //       intro: updatedIntro,
    //       gender: updatedGender,
    //   } = body;
    //   await puppyCollection.updateOne(
    //     { _id: new ObjectId(id as string) },
    //     { $set: { 
    //         city: updatedCity,
    //         state: updatedState,
    //         age: updatedAge,
    //         dog_name: updatedDogName,
    //         tagline: updatedTagline,
    //         intro: updatedIntro,
    //         gender: updatedGender,
    //     }},
    //   );
    //   res.status(204).end();
    //   break;
    // case 'DELETE':
    //   try {
    //     const deletedPuppy = await puppyCollection.deleteOne({ _id: id });
    //     if (deletedPuppy) {
    //       res.status(204).end();
    //     } else {
    //       res.status(404).json({ message: 'Puppy not found' });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    //   }
    switch (method) {
      case 'GET':
        try {
          const puppies = await puppyCollection.find().toArray();
          res.status(200).json(puppies);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching puppies.' });
        }
        break;
      case 'POST':
        try {
          const { 
              city,
              state,
              age,
              dog_name,
              tagline,
              intro,
              gender,
          } = req.body;
          const newPuppy = { 
            city,
            state,
            age,
            dog_name,
            tagline,
            intro,
            gender,
        };
          const result = await puppyCollection.insertOne(newPuppy);
          res.status(201).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating puppy.' });
        }
        break;
      // case 'PUT':
      //   try {
      //     const { id } = req.query;
      //     const { 
      //       city,
      //       state,
      //       age,
      //       dog_name,
      //       tagline,
      //       intro,
      //       gender,
      //   } = req.body;
      //     const updatedPuppy = { 
      //       city,
      //       state,
      //       age,
      //       dog_name,
      //       tagline,
      //       intro,
      //       gender,
      //   };
      //     const result = await puppyCollection.updateOne({ _id: id }, { $set: updatedPuppy });
      //     res.status(200).json(result);
      //   } catch (error) {
      //     console.error(error);
      //     res.status(500).json({ message: 'Error updating puppy.' });
      //   }
      //   break;
      // case 'DELETE':
      //   try {
      //     const { id } = req.query;
      //     const result = await puppyCollection.deleteOne({ _id: id });
      //     res.status(204).json(result);
      //   } catch (error) {
      //     console.error(error);
      //     res.status(500).json({ message: 'Error deleting puppy.' });
      //   }
      //   break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}