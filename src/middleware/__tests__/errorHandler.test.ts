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
      data: { id: 1, name: 'John Doe' },
      message: 'Success',
      status: 200,
    };

    handleResponse(res as Response, responseData);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: { id: 1, name: 'John Doe' },
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
});
