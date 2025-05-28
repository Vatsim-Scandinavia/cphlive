import type { FunctionalComponent } from 'preact';

const data = await fetch('https://data.vatsim.net/v3/vatsim-data.json').then((response) => response.json());

// Components that are build-time rendered also log to the CLI.
// When rendered with a `client:*` directive, they also log to the browser console.
console.log(data.pilots[0].flight_plan.arrival);

const countEKCHArrivals = data.pilots.reduce((count, pilot) => {
    if (pilot.flight_plan?.arrival === 'EKCH') {
        return count + 1;
    }
    return count;
}, 0);

const countEKCHDeparture = data.pilots.reduce((count, pilot) => {
    if (pilot.flight_plan?.departure === 'EKCH') {
        return count + 1;
    }
    return count;
}, 0);

console.log(`Number of arrivals to EKCH: ${countEKCHArrivals}`);

const Data: FunctionalComponent = () => {
  // Output the result to the page
  return <div className="w-full h-full flex justify-around items-center">
    <div className="flex items-center justify-center flex-col">
        <img src="/airplane.svg" alt="" className="w-32"/>
        <h2>Arrivals: {countEKCHArrivals}</h2>
    </div>
    <div className="flex items-center justify-center flex-col">
        <img src="/airplane.svg" alt="" className="w-32"/>
        <h2>Departures: {countEKCHDeparture}</h2>
    </div>
    </div>;
};

export default Data;