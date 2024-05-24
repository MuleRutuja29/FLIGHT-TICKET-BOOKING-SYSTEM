import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  private url = "http://localhost:3000";
  
  public countforPassenger = new BehaviorSubject<any[]>([]);
  passCOunt = this.countforPassenger.asObservable();

  constructor(private http:HttpClient) { }
  public downloadPDF(content: string): void {
    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
    pdf.save('sample.pdf');
  }

  
  sendPassengerCnt(passengerCount: any[]): void {
    this.countforPassenger.next(passengerCount);
  }

  getPassengerCNt(): any[] {
    return this.countforPassenger.getValue();
  }

  getBookedSearch(formData:object):Observable<{data:any}>{    
    return this.http.post<{data:any}>( `${this.url}/bookFlight`,formData )
  }
 
}
