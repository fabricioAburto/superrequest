import { Logger } from './log';
import { Cacheable } from './cacheable';
import { URLParams, CacheableURLBuilder } from './url';
import { AuthTokenInterceptorHelper } from './auth-token-interceptor';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class SuperRequest extends Cacheable {
  private logger: Logger = new Logger();
  private baseURL: Optional<string> = undefined;
  private axiosInstane: AxiosInstance = axios.create();
  private urlBuilder: CacheableURLBuilder = new CacheableURLBuilder(this);

  public setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }

  public disableLogs(): void {
    this.logger.disableLogs();
  }

  public enableLogs(): void {
    this.logger.enableLogs();
  }

  setAuthToken(token: string): void {
    if (token) this.axiosInstane = AuthTokenInterceptorHelper.setAuthToken(this.axiosInstane, token);
  }

  public get<T>(url: string, configs: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
    return new Promise(async (resolve, reject) => {
      if (this.isFirstCall(url)) {
        this.logger.info(`GET: Requesting first time for: ${url}`);
        try {
          const response = await this.getRequest<T>(url, configs);
          this.urlsExpirationTime[url] = this.defaultCacheExpirationTime;
          return resolve(response);
        } catch (error) {
          return reject(error);
        }
      }

      if (this.isURLExpired(url)) {
        this.logger.info(`GET: Requesting again expired url: ${url}`);
        try {
          const response = await this.getRequest<T>(url, configs);
          return resolve(response);
        } catch (error) {
          return reject(error);
        }
      }

      if (this.isCached(url)) {
        this.logger.info(`GET: Returning cached data for: ${url}`);
        const response = this.getCachedResponses<T>(url);
        return resolve(response);
      }

      try {
        this.logger.info(`GET: #Requestion again for: ${url}`);
        const response = await this.getRequest<T>(url, configs);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  public post<T, R>(url: string, data: T, configs: AxiosRequestConfig<any>): Promise<AxiosResponse<R>> {
    return this.axiosInstane.post<R>(this.resolveURL(url), data, configs);
  }

  public put<T, R>(url: string, data: T, configs: AxiosRequestConfig<any>): Promise<AxiosResponse<R>> {
    return this.axiosInstane.put<R>(this.resolveURL(url), data, configs);
  }

  public delete<T>(url: string, configs: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
    return this.axiosInstane.delete<T>(this.resolveURL(url), configs);
  }

  public resolveURL(url: string): string {
    return this.baseURL + url;
  }

  private async getRequest<T>(url: string, configs: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstane.get<T>(this.resolveURL(url), configs);

    this.cachedResponses[url] = response;
    this.urlsFirstCallTime[url] = Date.now();
    return response;
  }

  public buildUrl(url: string, params: URLParams) {
    return this.urlBuilder.buildURL(url, params);
  }
}

export const superrequest = new SuperRequest();
