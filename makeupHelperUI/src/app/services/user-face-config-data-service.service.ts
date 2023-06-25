import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserFaceConfigData } from '../models/UserFaceConfigData';
import { Observable } from 'rxjs'; 
import { environment } from '../models/BaseUrl';


@Injectable({
  providedIn: 'root'
})
export class UserFaceConfigDataServiceService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.apiUrl;

  getUserFaceConfigData() : Observable<UserFaceConfigData[]>{
 
      const headers = new HttpHeaders()
      .set('Accept', 'application/json')

    return this.http.get<UserFaceConfigData[]>(this.baseUrl + '/api/faceConfigData', {headers});
  }

 
  postData(selectedFaceConfigurations: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/api/faceConfigData`, selectedFaceConfigurations, { headers });
  }

    
  isUserFaceConfigSet():Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + '/api/faceConfigData/exists/');
    
    }
}
