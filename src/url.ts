import { SuperRequest } from './superrequest';

export interface ICacheableURLBuilder {
  expireCacheForEnpoint(): CacheableURL;
  cacheMilliseconds(milliseconds: number): CacheableURL;
  restartCacheExpirationTime(): CacheableURL;
  buildURL(url: string, params: URLParams): CacheableURL;
  get(): string;
}

export type CacheableURL = Omit<ICacheableURLBuilder, 'buildURL'>;
export type URLParams = Record<string, string | number | boolean>;

export class CacheableURLBuilder {
  // This values became unit for any time this builder is called.
  private endpoint: string = '';
  private stringURL: string = '';
  private superrequest: SuperRequest;

  constructor(superrequest: SuperRequest) {
    this.superrequest = superrequest;
  }

  private joinParams(params: URLParams): string {
    if (!Object.keys(params ?? {}).length) return '';
    const stringParams = Object.entries(params);
    return stringParams.map(([key, value]) => `${key}=${value}`).join('&');
  }

  public buildURL(url: string, params: URLParams): CacheableURL {
    this.endpoint = url;
    const stringParams = this.joinParams(params);
    if (stringParams === '') this.stringURL = url;
    else this.stringURL = `${url}${url.includes('?') ? '&' : '?'}${stringParams}`;
    return this;
  }

  public cacheMilliseconds(milliseconds: number): CacheableURL {
    this.superrequest.setURLExpirationTime(this.stringURL, milliseconds);
    return this;
  }

  public restartCacheExpirationTime(): CacheableURL {
    this.superrequest.restartURLExpirationTime(this.stringURL);
    return this;
  }

  public expireCacheForEnpoint(): CacheableURL {
    this.superrequest.expireEndpoint(this.endpoint);
    return this;
  }

  public get(): string {
    return this.stringURL;
  }
}
