import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { searchHandler } from './searchHandler';
import * as searchController from '../controllers/searchController';

describe('searchHandler', () => {
  it('should return 400 if query parameter is missing', async () => {
    const req = {
      query: {}
    } as Request;
    
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;

    await searchHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Query parameter is required');
  });

  it('should return 200 and the search results', async () => {
    const req = {
      query: { query: 'test' }
    } as unknown as Request;
    
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;

    const mockResults = {
      hotels: [],
      cities: [],
      countries: []
    };

    vi.spyOn(searchController, 'searchController').mockResolvedValue(mockResults);

    await searchHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockResults);
  });

  it('should return 500 on internal error', async () => {
    const req = {
      query: { query: 'test' }
    } as unknown as Request;
    
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;

    vi.spyOn(searchController, 'searchController').mockRejectedValue(new Error('Internal error'));

    await searchHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Something went wrong');
  });
});
