import { Component, OnInit } from '@angular/core';
import { FlightSearchService } from '../../Flight_Services/flight-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  payloadData:any={};
  sourceList:any=[];
  destinationList:any=[]
  routeList: any=[];
  flightAvailable: boolean=false;

  constructor(private FlightSearch :FlightSearchService,private router: Router, ){

  }

  ngOnInit(){
    this.payloadData ={
      tripType:"OneWay",
      sourceId:null,
      destinationId:null,
      departureDate:null,
      arrivalDate:null,
      adultCount:1,
      childrenCount:0,
      flightClass:null
    }
    this.getsourceList();
  }

  getsourceList(){
    this.sourceList=[];
    this.FlightSearch.getFlightDetails().subscribe(
      (res:any)=>{
        console.log("Country list",res);
        this.sourceList = res;
      },
      (err:any)=>{
        console.log("error",err);
      }
    )
  }

  onchangeSorce(sourceId:number){
  this.payloadData.destinationId =null;
   this.destinationList = this.sourceList.filter((data:any) => data.id !== sourceId);
   console.log("this.destinationList",this.destinationList);
  }

  onchangeDestination(){
   
    this.payloadData.departureDate == null;
    this.payloadData.flightClass == null
  }

  getToday(): string {
    return new Date().toISOString().split("T")[0];
  }

  handleFormSubmit(payloadDatat:any) {
     // Here you can handle the form data
     if(payloadDatat.tripType == 'OneWay'){
        if(this.payloadData.sourceId == null || this.payloadData.destinationId == null || this.payloadData.departureDate == null|| 
          this.payloadData.flightClass == null
        ){
          alert("Mandatory fields required");
          return
        }
     }else{
      if(this.payloadData.sourceId == null || this.payloadData.destinationId == null || this.payloadData.departureDate == null|| 
        this.payloadData.arrivalDate == null || this.payloadData.flightClass == null
      ){
        alert("Mandatory fields required");
        return
      }
     }
     const formData ={
      "tripType":payloadDatat.tripType,
      "sourceId":parseInt(payloadDatat.sourceId),
      "destinationId":parseInt(payloadDatat.destinationId),
      "departureDate":payloadDatat.departureDate,
      "arrivalDate":payloadDatat.arrivalDate,
      "adultCount":parseInt(payloadDatat.adultCount),
      "childrenCount":parseInt(payloadDatat.childrenCount),
      "flightClass":payloadDatat.flightClass
     }
     this.FlightSearch.getFlightSearch(formData).subscribe(
      (res:any)=>{
        
        this.routeList = res ;
        localStorage.setItem("searcResult",JSON.stringify(res))
        // this.FlightSearch.searchResultSource.next(this.routeList);
        // this.FlightSearch.setRouteList(this.routeList); 
        this.router.navigate(['/display-flight-details']);
        this.flightAvailable = true;
      },
      (err:any)=>{
        console.log("error",err);
        this.flightAvailable = false;
      }
     )

  }

 
}


