import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private url: string = 'http://localhost:3000';
  private token: any;

  constructor(private http:HttpClient) { }


  checkLogin(user: { email: string, password: string }): Observable<{ message: string, token: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ message: string, token: string }>(`${this.url}/login`, user, { headers });
  }

// In your service method
// checkLogin(user: { email: string, password: string }): Observable<{ message: string, token: string }> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   return this.http.post<{ message: string, token: string }>(`${this.url}/login`, user, { headers });
// }


  // checkLogin(user:object):Observable<{ message: string, token: string}>{   
  //   //here we would make connection with the server using HttpClient
  //   return this.http.post<{ message: string, token: string}>(this.url + '/login', user);
  // }
  createNewUser(user:object):Observable<{message:string}>{
    //let userToSend = {email:user.email, firstName:user.name.firstName,lastName:user.name.lastName,password:user.password};
    return this.http.post<{message:string}>(this.url + '/createUser', user);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  deleteToken(){
    delete this.token;
  }
}
