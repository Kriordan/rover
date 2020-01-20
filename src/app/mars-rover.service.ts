import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarsRoverService {

  constructor(
    private http: HttpClient
  ) { }

  marsRoverApiBaseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';  
  apiKeyParam = 'api_key=DEMO_KEY';

  getRover() {
    const url = `${this.marsRoverApiBaseUrl}rovers/curiosity?${this.apiKeyParam}`;
    return this.http.get(url);
  }

  getPhotos(sol) {
    const url = `${this.marsRoverApiBaseUrl}rovers/curiosity/photos?sol=${sol}&${this.apiKeyParam}`;
    return this.http.get(url);
  }
}
