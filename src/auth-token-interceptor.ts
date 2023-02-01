import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export class AuthTokenInterceptorHelper {
  static setAuthToken(preInstance: AxiosInstance, token: Optional<string>): AxiosInstance {
    const onFullFilled = (req: InternalAxiosRequestConfig<any>) => {
      req.headers['Authorization'] = 'Bearer ' + token;
      req.headers['Content-Type'] = `application/json`;
      return req;
    };
    const onRejected = (error: any) => Promise.reject(error);
    preInstance.interceptors.request.use(onFullFilled, onRejected);
    return preInstance;
  }
}
