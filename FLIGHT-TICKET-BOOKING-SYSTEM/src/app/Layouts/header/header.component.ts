import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/Auth Guard/Services/logs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  token:any;
  showNavTabs: boolean=false;

  constructor(private login : LogsService,private route :Router){

  }
  ngOnInit(){
    this.token = this.login.getToken();
    if(this.token){
        this.showNavTabs =true;
    }else{
      this.showNavTabs =false;
    }
  }
  logOut(){
    this.token = null;
    this.showNavTabs =false;
    localStorage.clear();
    this.route.navigate(['/about-flight'])
  }
}
