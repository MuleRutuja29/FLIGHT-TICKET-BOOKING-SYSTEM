import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private url = "http://localhost:3000";
  // private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //2. Create the data which we want to share with all the components

  searchResultSource = new BehaviorSubject<any>([]);



  constructor(private http:HttpClient) { }

  getFlightDetails():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/countryList`);
  }
  getFlightSearch(formData:object):Observable<{flightAvailabilityResult:any}>{    
    return this.http.post<{flightAvailabilityResult:any}>( `${this.url}/flights`,formData )
  }
 
  //3. Now we want to broadcast this message or data, so we create an observable
  getSearchResultSource(): Observable<any>{
    return this.searchResultSource.asObservable()
  };
}
