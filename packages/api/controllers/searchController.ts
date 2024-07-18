import { Db } from 'mongodb';


export const searchController = async (db: Db, query: string) => {
  const regexQuery = { $regex: query, $options: 'i' };

  const [hotels, cities, countries] = await Promise.all([
    db.collection('hotels').find({
      $or: [
        { hotel_name: regexQuery },
        { city: regexQuery },
        { country: regexQuery }
      ]
    }).toArray(),
    db.collection('cities').find({
      name: regexQuery
    }).toArray(),
    db.collection('countries').find({
      country: regexQuery
    }).toArray()
  ]);

  return { hotels, cities, countries };
};
