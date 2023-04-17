import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 constructor(private http: HttpClient){}


  get(url:string, pageNumber?:number ,pageSize?:number): Observable<any>{
    
    const params = new HttpParams()
    .set('page',pageNumber || 0)
    .set('size',pageSize || 10)
    return this.http.get(url, {params: params})

  }

  delete(urlWithId : string): Observable<any>{
    return this.http.delete(urlWithId,{})
  }

  post(url : string , json: any): Observable<any>{
    return this.http.post(url,json)
  }

  put(url : string , json: any): Observable<any>{
    return this.http.put(url,json)
  }

}
