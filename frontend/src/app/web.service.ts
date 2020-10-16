import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private http: HttpClient ) {
    this.ROOT_URL = "http://localhost:3000";
   }
   
   get(uri:string){
     const url= this.ROOT_URL + "/" + uri;
     return this.http.get(url );
   }
  post(uri:string,payload:Object){
    const url= this.ROOT_URL + "/" + uri;
    return this.http.post(url,payload);
  }
  patch(uri:string,payload:Object){
    const url= this.ROOT_URL + "/" + uri;
    return this.http.patch(url,payload);
  }
  delete(uri:string){
    const url= this.ROOT_URL + "/" + uri;
    return this.http.delete(url);
  }

}
