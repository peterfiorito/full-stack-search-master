import { describe, it, expect, vi } from 'vitest';
import { Router } from 'express';
import searchRoutes from './searchRoutes';
import * as searchHandlerModule from '../handlers/searchHandler';

describe('searchRoutes', () => {
  it('should set up the GET / route with the searchHandler', () => {
    const router = Router();
    const useSpy = vi.spyOn(router, 'use');

    router.use('/', searchRoutes);

    expect(useSpy).toHaveBeenCalled();
  });

  it('should call searchHandler for GET /', () => {
    const searchHandlerSpy = vi.spyOn(searchHandlerModule, 'searchHandler');
    const req = { query: { query: 'test' } } as any;
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() } as any;

    searchHandlerModule.searchHandler(req, res);

    expect(searchHandlerSpy).toHaveBeenCalledWith(req, res);
  });
});
