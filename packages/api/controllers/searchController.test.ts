import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Db } from 'mongodb';
import { searchController } from './searchController';

describe('searchController', () => {
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      collection: vi.fn().mockReturnThis(),
      find: vi.fn().mockReturnThis(),
      toArray: vi.fn()
    };
  });

  it('should return search results', async () => {
    const mockResults = {
      hotels: [{ hotel_name: 'Hotel Test', city: 'Test City', country: 'Test Country' }],
      cities: [{ name: 'Test City' }],
      countries: [{ country: 'Test Country' }]
    };

    mockDb.toArray
      .mockResolvedValueOnce(mockResults.hotels)
      .mockResolvedValueOnce(mockResults.cities)
      .mockResolvedValueOnce(mockResults.countries);

    const result = await searchController(mockDb as unknown as Db, 'test');
    expect(result).toEqual(mockResults);
  });

  it('should throw an error if connection fails', async () => {
    mockDb.collection.mockImplementation(() => { throw new Error('Connection failed'); });

    await expect(searchController(mockDb as unknown as Db, 'test')).rejects.toThrow('Connection failed');
  });
});
