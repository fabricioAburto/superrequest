import { AxiosResponse } from 'axios';

export class Cacheable {
  protected urlsFirstCallTime: Record<string, number> = {};
  protected urlsExpirationTime: Record<string, number> = {};
  protected cachedResponses: Record<string, AxiosResponse<any>> = {};

  protected defaultCacheExpirationTime: number = 5000;

  protected isURLExpired(url: string): boolean {
    const now = Date.now();
    const firstCallTime = this.urlsFirstCallTime[url];
    return now - firstCallTime > this.urlsExpirationTime[url];
  }

  protected isFirstCall(url: string): boolean {
    return !this.urlsFirstCallTime[url];
  }

  protected getCachedResponses<T>(url: string): AxiosResponse<T> {
    return this.cachedResponses[url] as AxiosResponse<T>;
  }

  protected isCached(url: string): boolean {
    return url in this.cachedResponses;
  }

  public setDefaultCacheTime(milliseconds: number): void {
    this.defaultCacheExpirationTime = milliseconds;
  }

  public clearCache(): void {
    this.urlsFirstCallTime = {};
    this.urlsExpirationTime = {};
    this.cachedResponses = {};
  }

  public setURLExpirationTime(url: string, milliseconds: number): void {
    this.urlsExpirationTime[url] = milliseconds;
  }

  public restartURLExpirationTime(url: string): void {
    this.urlsExpirationTime[url] = this.defaultCacheExpirationTime;
  }

  public expireEndpoint(endpoint: string): void {
    for (const url of Object.keys(this.urlsFirstCallTime)) {
      if (url.startsWith(endpoint)) {
        if (url in this.urlsFirstCallTime) delete this.urlsFirstCallTime[url];
        if (url in this.cachedResponses) delete this.cachedResponses[url];
        if (url in this.urlsExpirationTime) delete this.urlsExpirationTime[url];
      }
    }
  }
}
