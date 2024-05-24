import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerDetailsService } from '../../Flight_Services/customer-details.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin if 

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})

export class CustomerDetailsComponent implements OnInit {
  @ViewChild('exampleModal') exampleModal: any;
  noOfAdultCount: any;
  noOfChildCount: any;
  detailsOfRoute: any = [];
  AdultPassengersList: any = [];
  ChildPassengerList: any = [];

  // progressValue: number = 0;
  currentStep: any = 0;
  currentLabel = 'Passenger Details';
  steps: any = [];
  paymentObject: any = {}
  totalBaseFare: any;
  isArray: boolean = false;
  adultWithCharges: any;
  childrenWithCharges: any;
  adultWithTotalCharges: any;
  childWithCharges: any;
  childWithTotalCharges: any;
  ListOfBookingDetails: any;
  showModal: boolean = false;

  contentData: string = `
  
    <h1 class="display-4">Hello World!</h1>
    <p class="lead">This is a simple example of converting HTML with Bootstrap styling to a PDF in Angular.</p>
  
`;
  showDownloadButton: boolean = false;

  constructor(private customerDetail: CustomerDetailsService) {
    this.steps = [
      {
        label: 'Passenger Details',
        completeSatus: false,
        currentIndex: 1,
      },
      {
        label: 'Payment Details',
        completeSatus: false,
        currentIndex: 2,
      },
      {
        label: 'Download Ticket',
        completeSatus: false,
        currentIndex: 3,
      },
    ];
    this.paymentObject = {
      "email": null,
      "address": null,
      "country": null,
      "state": null,
      "zip": null,
      "paymentmode": "Credit",
      "ccname": null,
      "ccnumber": null,
      "ccexpiration": null,
      "cccvv": null,
    }

  }

  ngOnInit() {
    this.totalBaseFare = null
    const array: any = localStorage.getItem("finalRouteList");
    this.detailsOfRoute = JSON.parse(array);
    console.log("this.detailsOfRoute", this.detailsOfRoute);
    this.isArray = Array.isArray(this.detailsOfRoute);
    if (!this.isArray) {
      this.noOfAdultCount = this.detailsOfRoute.adultCount;
      this.noOfChildCount = this.detailsOfRoute.childrenCount;
      this.totalBaseFare = this.detailsOfRoute.totalofAllPassengers;
      this.adultWithCharges = this.detailsOfRoute.route.flight.basePriceAdult;
      this.adultWithTotalCharges = this.noOfAdultCount * this.adultWithCharges;
      if (this.noOfChildCount > 0) {
        this.childrenWithCharges = this.detailsOfRoute.route.flight.basePriceChild;
        this.childWithTotalCharges = this.noOfChildCount * this.childrenWithCharges;
      }
    } else {
      this.noOfAdultCount = this.detailsOfRoute[2].adultCount;
      this.noOfChildCount = this.detailsOfRoute[2].childrenCount;
      this.adultWithCharges = this.detailsOfRoute[0].outboundFlight.basePriceAdult + this.detailsOfRoute[1].returnFlight.basePriceAdult
      this.adultWithTotalCharges = this.noOfAdultCount * this.adultWithCharges
      if (this.noOfChildCount > 0) {
        this.childrenWithCharges = this.detailsOfRoute[0].outboundFlight.basePriceChild + this.detailsOfRoute[1].returnFlight.basePriceChild;
        this.childWithTotalCharges = this.noOfChildCount * this.childrenWithCharges;
      }
      this.totalBaseFare = this.detailsOfRoute[0].totalofOutBound + this.detailsOfRoute[1].totalofOutBound
    }

    // })
    this.getPassengerDeatils(this.noOfAdultCount, this.noOfChildCount)

  }

  onClickStep(steps: any, i: number) {
    console.log("..........", steps, i);
    this.currentLabel = steps.label

  }

  getPassengerDeatils(noOfAdultCount: number, noOfChildCount: number) {
    this.AdultPassengersList = [];
    this.ChildPassengerList = [];
    if (noOfAdultCount > 0) {
      // Loop for adults
      for (let i = 0; i < noOfAdultCount; i++) {
        const payloadAdult = {
          "fullNameOfAdult": null,
          "emailOfAdult": null,
          "genderOfAdult": null,
          "phoneNumOfAdult": null,
        };
        this.AdultPassengersList.push(payloadAdult);
      }
      console.log("this.AdultPassengersList", this.AdultPassengersList);

    }
    if (noOfChildCount > 0) {
      // Loop for children
      for (let i = 0; i < noOfChildCount; i++) {
        const payloadChild = {
          "fullNameOfChild": null,
          "genderOfChild": null,
        };
        this.ChildPassengerList.push(payloadChild);
      }
    }
    console.log("this.ChildPassengerList", this.ChildPassengerList);

  }

  sendOnlySRcandDestinationDate() {
    this.isArray = Array.isArray(this.detailsOfRoute);

    if (!this.isArray) {
      this.detailsOfRoute.route.flight.nameOfRoute;
      this.detailsOfRoute.route.flight.flightNumber;

    }
  }

  checkOut(paymentObject: any) {
    this.showDownloadButton = false;
    let adultCount = 0;
    let childCount = 0
    this.AdultPassengersList.forEach((element: any) => {
      if (!element.fullNameOfAdult || !element.emailOfAdult || !element.genderOfAdult || !element.phoneNumOfAdult) {
        adultCount++
      }
    });

    if (this.ChildPassengerList?.length) {
      this.ChildPassengerList.forEach((element: any) => {
        if (!element.fullNameOfChild || !element.genderOfChild) {
          childCount++
        }
      });
    }
    if (adultCount > 0) {
      alert("Adult passenger Details are required");
      return
    }
    if (childCount > 0) {
      alert("Child passenger Details are required");
      return
    }
    if (!paymentObject.email || !paymentObject.address || !paymentObject.country || !paymentObject.state || !paymentObject.zip ||
      !paymentObject.ccname || !paymentObject.ccnumber || !paymentObject.ccexpiration || !paymentObject.cccvv
    ) {
      alert("Paymnet Details are required");
      return
    }

    const paymnetobj = {
      "totalBaseFare": this.totalBaseFare,
      "adultWithCharges": this.adultWithCharges,
      "adultWithTotalCharges": this.adultWithTotalCharges,
      "childrenWithCharges": this.childrenWithCharges,
      "childWithTotalCharges": this.childWithTotalCharges,
      "totalOfAll": this.totalBaseFare + 500,
      "detailsOfRoute": this.detailsOfRoute
    }
    const formData = {
      adultPassengers: this.AdultPassengersList,
      childPassengers: this.ChildPassengerList,
      paymentDetails: paymentObject,
      totalOfPaymnet: paymnetobj
    };
    // Now you can send formData to your server or perform any other action
    console.log(formData);
    this.customerDetail.getBookedSearch(formData).subscribe(
      (res: any) => {
        console.log("res", res);
        this.ListOfBookingDetails = res;
        this.showDownloadButton = true;
        this.currentLabel = this.steps[2].label
      },
      (err) => {
      })
  }

  generatePDF2() {
    const doc = new jsPDF();
    let yPos = 10;
    // Add title
    doc.setFontSize(16);
    doc.text('Flight Details', 10, yPos);
    yPos += 10;

    // Add adult passengers table
    doc.setFontSize(12);
    doc.text('Adult Passengers:', 10, yPos);
    yPos += 10;
    if (this.ListOfBookingDetails.adultPassengers) {
      const adultPassengers = this.ListOfBookingDetails.adultPassengers.map((passenger: any) => [
        passenger.fullNameOfAdult,
        passenger.emailOfAdult,
        passenger.genderOfAdult,
        passenger.phoneNumOfAdult
      ]);
      (doc as any).autoTable({
        startY: yPos,
        head: [['Full Name', 'Email', 'Gender', 'Phone']],
        body: adultPassengers
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }

    if (this.ListOfBookingDetails.childPassengers?.length) {
      const childPassengers = this.ListOfBookingDetails.childPassengers.map((passenger: any) => [
        passenger.fullNameOfChild,
        passenger.genderOfChild,
      ]);
      (doc as any).autoTable({
        startY: yPos,
        head: [['Full Name', 'Gender']],
        body: childPassengers
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }

    // Add payment details table
    doc.text('Payment Details:', 10, yPos);
    yPos += 10;
    if (this.ListOfBookingDetails.paymentDetails) {
      // const paymentDetails = Object.entries(this.ListOfBookingDetails.paymentDetails).map(([key, value]) => [key, value]);
      (doc as any).autoTable({
        startY: yPos,
        head: [['Name on Card', 'Email', 'Payment Mode', 'Address',]],
        body: [[this.ListOfBookingDetails.paymentDetails.ccname, this.ListOfBookingDetails.paymentDetails.email,
        this.ListOfBookingDetails.paymentDetails.paymentmode,
        this.ListOfBookingDetails.paymentDetails.address
        ]]
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }

    if (!this.isArray) {
      (doc as any).autoTable({
        startY: yPos,
        head: [['From -To', 'Airline', 'Departure Date', 'Travel CLass']],
        body: [[this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute.route.flight.nameOfRoute,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute.route.flight.airline,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute.departureDate,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute.flightClass
        ]],
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }

    if (this.isArray) {
      (doc as any).autoTable({
        startY: yPos,
        head: [['From -To', 'Airline', 'Departure Date', 'Travel CLass']],
        body: [[this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[0].outboundFlight.nameOfRoute,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[0].outboundFlight.airline,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[2].departureDate,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[2].flightClass

        ]],
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }

    if (this.isArray) {
      (doc as any).autoTable({
        startY: yPos,
        head: [['From -To', 'Airline', 'Arrival Date', 'Travel CLass']],
        body: [[this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[1].returnFlight.nameOfRoute,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[1].returnFlight.airline,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[2].arrivalDate,
        this.ListOfBookingDetails.totalOfPaymnet.detailsOfRoute[2].flightClass
        ]],
      });
      yPos += (doc as any).autoTable.previous.finalY + 10;
    }
    // Save PDF
    doc.save('flight_details.pdf');
  }


}
