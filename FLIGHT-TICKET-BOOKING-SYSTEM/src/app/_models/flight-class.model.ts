export class FlightClass {
        private tripType?: string;
        private sourceId?: number;
        private destinationId?: number;
        private departureDate?: Date;
        private arrivalDate?: Date;
        private adultCount?: number;
        private childrenCount?: number;
        private flightClass?: string;

    
        constructor();
        constructor(
            tripType?: string,
            sourceId?: number,
            destinationId?: number,
            departureDate?: Date,
            arrivalDate?: Date,
            adultCount?: number,
            childrenCount?: number,
            flightClass?: string
            
        ) {
            this.tripType = tripType;
          this.sourceId = sourceId;
          this.destinationId = destinationId;
          this.departureDate = departureDate;
          this.arrivalDate = arrivalDate;
          this.adultCount = adultCount;
          this.childrenCount = childrenCount;
          this.flightClass = flightClass;
        }
    
}
