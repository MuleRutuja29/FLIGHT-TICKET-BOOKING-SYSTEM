import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  
  private dataSubjectLogin = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.dataSubjectLogin.asObservable();
  isLoggedIn:boolean=false;

 

  constructor() { }

  LoggedIn(newValue: boolean) {
    this.dataSubjectLogin.next(newValue);
  }

  LoggedOut(newValue:boolean){
    this.dataSubjectLogin.next(newValue);
  }

  

  login(){
    this.isLoggedIn = true;
  }
  getLogin(){
    return this.isLoggedIn;
  }
}
