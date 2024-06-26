import { Response } from 'express';

import { ResponseData } from './interface/index.js';

/**
 * Sends a JSON response with the provided data, message, and status code.
 *
 * @template T - The type of the data being returned.
 * @param {Response} res - The Express response object.
 * @param {ResponseData<T>} responseData - The response data object.
 * @param {T} [responseData.data] - The data to be returned in the response.
 * @param {string} responseData.message - The message to be returned in the response.
 * @param {number} responseData.status - The HTTP status code for the response.
 * @returns {void}
 */
const handleResponse = <T>(
  res: Response,
  responseData: ResponseData<T>
): void => {
  const { data, message, status } = responseData;
  res.status(status).json({ data, message, status });
};

export default handleResponse;
