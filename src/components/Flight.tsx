interface FlightProps { 
    flight_number: string,
    departure: string,
    arrival: string,
    departure_time: string,
    arrival_time: string,
    departure_short: string,
    arrival_short: string,
    time_hours: number,
    time_minutes: number,
}

const Flight = (props: FlightProps) => {
  return (
    <div className="w-full h-32 bg-[#292929] text-white m-2">
        <div className="grid grid-cols-4 grid-rows-3 w-full h-full">
            <div className="col-span-1 row-span-3 flex items-center justify-center text-center"> {props.time_hours} hour <br /> {props.time_minutes} Miniutes</div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex items-end text-sm">{props.flight_number}</div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 font-medium text-3xl">{props.departure}</div>
            <div className="col-start-2 col-end-3 row-start-3 row-end-4">{props.departure_short}: <span className="font-semibold">{props.departure_time}</span></div>
            <div className="col-span-1 row-span-3 col-start-3 flex items-center justify-center -ml-12 text-4xl">➤</div>
            <div className="col-start-4 col-end-5 row-start-1 row-end-2 flex items-end text-sm -ml-12">Departs On time</div>
            <div className="col-start-4 col-end-5 row-start-2 row-end-3 font-medium text-3xl -ml-12">{props.arrival}</div>
            <div className="col-start-4 col-end-5 row-start-3 row-end-4 -ml-12">{props.arrival_short}: <span className="font-semibold">{props.arrival_time}</span></div>
        </div>
    </div>
  );
};

export { Flight };
