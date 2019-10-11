import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Local storage service
 */
export class StorageService {

  public keys: StorageKeys = new StorageKeys();

  constructor() { }

  /**
   * Get a single value from storage by key
   * Results to null if the value was not found
   * @param key
   */
  public getValue(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * Store a single value to storage
   * @param key
   * @param value
   */
  public setValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Remove an item from storage
   * @param key
   */
  public deleteValue(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Check if there's a value in storage for specified key
   * @param key
   */
  public hasValue(key: string): boolean {
    return this.getValue(key) != null;
  }

  get token(): string {return this.getValue(this.keys.TOKEN);}
  set token(value: string) {this.setValue(this.keys.TOKEN, value);}
}

class StorageKeys {
  public readonly TOKEN = 'token';
}
