import { Response } from 'express';

import type { ResponseData } from '../interface/index.d.ts';
import handleResponse from '../responseHandler.ts';

describe('handleResponse', () => {
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a JSON response with the provided data, message, and status code', () => {
    const responseData: ResponseData<string> = {
      data: 'Example data',
      message: 'Example message',
      status: 200,
    };

    handleResponse(res, responseData);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(responseData.status);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should send a JSON response without data if not provided', () => {
    const responseData: ResponseData = {
      message: 'Example message',
      status: 400,
    };

    handleResponse(res, responseData);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(responseData.status);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(responseData);
  });
});
