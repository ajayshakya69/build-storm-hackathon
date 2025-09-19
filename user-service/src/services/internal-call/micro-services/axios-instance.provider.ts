import axios, { AxiosError, AxiosInstance } from 'axios';

export class AxiosInstanceProvider {
  protected readonly axiosInstance: AxiosInstance;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });

    this.axiosInstance.interceptors.request.use((config) => {
      if (process.env.X_SECRET) {
        config.headers.set('x-secret', process.env.X_SECRET);
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (res) => res, // successful response
      (error: AxiosError) => {
        // gracefully handle error
        const responseData: any = error.response?.data;
        const statusCode = error.response?.status || 500;
        const errorMessage =
          responseData?.meta?.message ??
          responseData?.message ??
          error.message ??
          'Something Went Wrong';
        // return a consistent response format instead of throwing
        return Promise.resolve({
          data: {
            data: responseData?.data ?? null,
            meta: {
              ...(responseData?.meta ?? {}),
              statusCode,
              errorMessage,
            },
          },
        });
      },
    );
  }
}
