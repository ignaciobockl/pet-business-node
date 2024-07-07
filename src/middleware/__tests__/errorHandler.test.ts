import { Response } from 'express';

import { ResponseData } from '../../utils/interface/index.js';
import handleResponse from '../../utils/responseHandler.ts';

describe('handleResponse', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should send a JSON response with the provided data, message, and status code', () => {
    const responseData: ResponseData = {
      data: { id: 1, name: 'Lalo Landa' },
      message: 'Success',
      status: 200,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: { id: 1, name: 'Lalo Landa' },
      message: 'Success',
      status: 200,
    });
  });

  it('should send a JSON response with the provided message and status code without data', () => {
    const responseData: ResponseData = {
      message: 'No Content',
      status: 204,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      data: undefined,
      message: 'No Content',
      status: 204,
    });
  });

  it('should send a JSON response with an error message and 500 status if no status is provided', () => {
    const responseData: ResponseData = {
      message: 'Error occurred',
      status: 500,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      data: undefined,
      message: 'Error occurred',
      status: 500,
    });
  });

  it('should send a JSON response with null data', () => {
    const responseData: ResponseData = {
      data: null,
      message: 'Data is null',
      status: 200,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      message: 'Data is null',
      status: 200,
    });
  });

  it('should send a JSON response with empty data', () => {
    const responseData: ResponseData<[]> = {
      data: [],
      message: 'Empty array',
      status: 200,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [],
      message: 'Empty array',
      status: 200,
    });
  });
});
