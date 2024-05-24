import { Component, Input, OnInit } from '@angular/core';
import { FlightClass } from 'src/app/_models/flight-class.model';
import { FlightSearchService } from '../../Flight_Services/flight-search.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { CustomerDetailsService } from '../../Flight_Services/customer-details.service';

@Component({
  selector: 'app-display-flight-details',
  templateUrl: './display-flight-details.component.html',
  styleUrls: ['./display-flight-details.component.scss']
})
export class DisplayFlightDetailsComponent implements OnInit {
  routeList: any = [];
  isOneWayROuteType: boolean = false;
  payloadData: any = {};
  finalRouteList: any = [];
  finalRouteListOutBound: any = [];
  finalRouteListReturn: any = [];
  outboundFlight: any = {};
  returnFlight: any = {};
  totalOfAllFare: any;

  constructor(private route: Router, private customerDetail: CustomerDetailsService) { }

  ngOnInit() {
    const array: any = localStorage.getItem('searcResult')
    this.routeList = JSON.parse(array);
    const routeType = this.routeList.find((ele: any) => ele.route.type === "OneWay")
    if (routeType != undefined) {
      this.isOneWayROuteType = true;
    } else {
      this.isOneWayROuteType = false;
      this.routeList.forEach((element: any, index: number) => {
        if (element.route && element.route.outboundFlight && element.route.returnFlight) {
          if (index === 0) {
            element.route.outboundFlight.Onward = true;
            element.route.returnFlight.Return = false;
          } else {
            element.route.outboundFlight.Onward = false;
            element.route.returnFlight.Return = true;
          }
        }
      });
      console.log("this.routeList", this.routeList);
    }
  }

  checkOnwardOutBound(dataFly: any, outboundFlightOnward: any, i: number) {
    this.finalRouteListOutBound = [];
    var obj = {
      "outboundFlight": dataFly.route.outboundFlight,
      "totalofOutBound": dataFly.totalofOutBound,
    }
    this.finalRouteListOutBound.push(obj);
    this.getFinalArray(dataFly, dataFly.adultCount, dataFly.childrenCount);
  }

  checkReturnBound(dataFly: any, returnFlight: any, i: number) {
    this.finalRouteListReturn = [];
    var obj = {
      "returnFlight": dataFly.route.returnFlight,
      "totalofOutBound": dataFly.totalOfReturn,
    }
    this.finalRouteListReturn.push(obj)
    this.getFinalArray(dataFly, dataFly.adultCount, dataFly.childrenCount);
  }

  getFinalArray(dataFly: any, adultCounts: any, childrenCounts: any) {
    if (this.finalRouteListOutBound?.length && this.finalRouteListReturn?.length) {
      const CountOfPass = {
        "adultCount": adultCounts,
        "childrenCount": childrenCounts,
        "totalPriceForAdultOutbound": dataFly.totalPriceForAdultOutbound,
        "totalPriceForAdultReturn": dataFly.totalPriceForAdultReturn,
        "totalPriceForChildrenOutbound": dataFly.totalPriceForChildrenOutbound,
        "totalPriceForChildrenReturn": dataFly.totalPriceForChildrenReturn,
        "arrivalDate": dataFly.arrivalDate,
        "departureDate": dataFly.departureDate,
        "flightClass": dataFly.flightClass
      }
      this.finalRouteList = [...this.finalRouteListOutBound, ...this.finalRouteListReturn, CountOfPass];
      console.log("this.finalRouteList", this.finalRouteList);
      this.outboundFlight = this.finalRouteList[0].outboundFlight;
      this.returnFlight = this.finalRouteList[1].returnFlight;
      this.totalOfAllFare = this.finalRouteList[0].totalofOutBound + this.finalRouteList[1].totalofOutBound
    }
  }

  onClickBooking(label: string, index: number) {
    if (label === 'OneWay') {
      this.customerDetail.countforPassenger.next(this.routeList[index]);
      localStorage.setItem("finalRouteList", JSON.stringify(this.routeList[index]))
      this.route.navigate(['/customer-details'])
    } else {
      this.customerDetail.countforPassenger.next(this.finalRouteList);
      localStorage.setItem("finalRouteList", JSON.stringify(this.finalRouteList))
      this.route.navigate(['/customer-details'])
    }
  }

  ngOnDestroy() {
    // Clearing the specific item
    localStorage.removeItem('finalRouteList');
  }

}
