/**
 * Interface for defining the structure of response data.
 *
 * @template T - The type of the data being returned.
 */
export interface ResponseData<T = unknown> {
  data?: T;
  message: string;
  status: number;
}

export interface ValidationError extends Error {
  details?: unknown;
  missingFields?: string[];
}
