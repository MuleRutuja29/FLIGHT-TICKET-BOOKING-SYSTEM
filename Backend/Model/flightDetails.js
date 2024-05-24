const fs = require('fs');
const FlightDetail = JSON.parse(fs.readFileSync('./Json-data/searchFlight.json', 'utf8'));

class FlightDetails {
    constructor() {
    }

    checkFlightAvailable(tripType, sourceId, destinationId, departureDate, arrivalDate, adultCount, childrenCount, flightClass) {
        let routes = [];

        if (tripType === 'OneWay') {
            routes = FlightDetail.filter(data =>
                data.type === tripType &&
                data.flight.sourceId === sourceId &&  
                data.flight.destinationId === destinationId && data.flight.departureDates.includes(departureDate)
            );
            if (routes.length > 0) {
                
                // If routes are found, calculate total price for each route and return an array of results
                const results = routes.map(route => {
                    const totalPriceForAdult = this.getTotalPriceForAdult(route.flight.basePriceAdult, adultCount);
                    const totalPriceForChildren = this.getTotalPriceForChildren(route.flight.basePriceChild, childrenCount);
                    const totalofAllPassengers = this.getTotalOfPassengers(totalPriceForAdult, totalPriceForChildren);
                    return { route, adultCount, childrenCount, totalPriceForAdult, totalPriceForChildren, totalofAllPassengers, departureDate,flightClass };
                });
                return results;
            } else {
                return [];
            }
        } else {
            routes = FlightDetail.filter(data =>
                data.type === tripType &&
                data.outboundFlight.sourceId === sourceId &&
                data.outboundFlight.destinationId === destinationId && data.outboundFlight.arrivalDates.includes(arrivalDate)
            );
            if (routes.length > 0) {
                // If routes are found, calculate total price for each route and return an array of results
                const results = routes.map(route => {
                    const totalPriceForAdultOutbound = this.getTotalPriceForAdult(route.outboundFlight.basePriceAdult, adultCount);
                    const totalPriceForChildrenOutbound = this.getTotalPriceForChildren(route.outboundFlight.basePriceChild, childrenCount);

                    const totalPriceForAdultReturn = this.getTotalPriceForAdultReturn(route.returnFlight.basePriceAdult, adultCount);
                    const totalPriceForChildrenReturn = this.getTotalPriceForChildrenReturn(route.returnFlight.basePriceChild, childrenCount);

                    const totalOfReturn = this.getTotalOfReturn(totalPriceForAdultReturn, totalPriceForChildrenReturn)
                    const totalofOutBound = this.getTotalofOutBound(totalPriceForAdultOutbound, totalPriceForChildrenOutbound)

                    const totalofAllPassengers = this.getTotalOfPassengers(totalOfReturn, totalofOutBound);
                    return {
                        route, adultCount, childrenCount, totalPriceForAdultOutbound, totalPriceForChildrenOutbound,
                        totalPriceForAdultReturn, totalPriceForChildrenReturn,
                        totalOfReturn, totalofOutBound,
                        totalofAllPassengers, arrivalDate ,departureDate,
                        flightClass
                    };
                });
                return results;
            } else {
                return "No flights available for the specified route on the specified date.";
            }
        }
        return routes;
    }
    getTotalPriceForAdult(basePriceAdult, numberOfAdults) {
        // Implement logic to calculate total price for adults
        return numberOfAdults * basePriceAdult;
    }

    getTotalPriceForChildren(basePriceChild, numberOfChildren) {
        // Implement logic to calculate total price for children
        return numberOfChildren * basePriceChild;
    }

    getTotalPriceForAdultReturn(basePriceChild, numberOfChildren) {
        // Implement logic to calculate total price for children
        return numberOfChildren * basePriceChild;
    }
    getTotalPriceForChildrenReturn(basePriceChild, numberOfChildren) {
        // Implement logic to calculate total price for children
        return numberOfChildren * basePriceChild
    }

    getTotalOfReturn(totalPriceForAdultReturn, totalPriceForChildrenReturn) {
        return totalPriceForAdultReturn + totalPriceForChildrenReturn
    }

    getTotalofOutBound(totalPriceForAdultOutbound, totalPriceForChildrenOutbound) {
        return totalPriceForAdultOutbound + totalPriceForChildrenOutbound
    }

    getTotalOfPassengers(totalPriceForAdult, totalPriceForChildren) {
        return totalPriceForAdult + totalPriceForChildren;
    }

    // checkFlightAvailability(source, destination, numberOfAdults, numberOfChildren, dateOfTravel) {
    //     const route = `${source}-${destination}`;
    //     const foundRoute = FlightDetail.filter(r => r.nameOfRoute === route && r.departureDates.includes(dateOfTravel));
    //     if (foundRoute && foundRoute.length > 0) {
    //         const results = foundRoute.map(route => {
    //             const totalPriceForAdult = this.getTotalPriceForAdult(route.basePriceAdult, numberOfAdults);
    //             const totalPriceForChildren = this.getTotalPriceForChildren(route.basePriceChild, numberOfChildren);
    //             const totalofAllPassengers = this.getTotalOfPassengers(totalPriceForAdult, totalPriceForChildren);
    //             return { route, totalPriceForAdult, totalPriceForChildren, totalofAllPassengers };
    //         });

    //         return results;
    //     } else {
    //         return "No flights available for the specified route on the specified date.";
    //     }

    // }

    // getTotalPriceForAdult(basePriceAdult,numberOfAdults) {
    //     // Implement logic to calculate total price for adults
    //     return numberOfAdults * basePriceAdult
    // }

    // getTotalPriceForChildren(basePriceChild,numberOfChildren) {
    //     // Implement logic to calculate total price for children
    //     return numberOfChildren * basePriceChild
    // }

    // getTotalOfPassengers(totalPriceForAdult,totalPriceForChildren){
    //     return totalPriceForAdult + totalPriceForChildren
    // }
}

module.exports = FlightDetails;
