import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/Auth Guard/Services/logs.service';

@Component({
  selector: 'app-about-flight',
  templateUrl: './about-flight.component.html',
  styleUrls: ['./about-flight.component.scss']
})
export class AboutFlightComponent implements OnInit {
  token:any;
  showNavTabs: boolean=false;

  constructor(private login : LogsService){

  }
  ngOnInit(){
    this.token = this.login.getToken();
    if(this.token){
        this.showNavTabs =true;
    }else{
      this.showNavTabs =false;
    }
  }

}
