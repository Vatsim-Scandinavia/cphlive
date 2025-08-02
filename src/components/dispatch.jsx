import React from "react";

const Dispatch = () => {
    const [flights, setFlights] = React.useState([]);

    React.useEffect(() => {
        fetch("/flights.csv")
            .then(response => response.text())
            .then(text => {
                const lines = text.trim().split("\n");
                const headers = lines[0].replace(/"/g, "").split(",");
                const data = lines.slice(1).map(line => {
                    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(v => v.replace(/"/g, ""));
                    const obj = {};
                    headers.forEach((h, i) => obj[h] = values[i]);
                    return {
                        callsign: obj.FlightNumber,
                        type: obj.AircraftType,
                        dest: obj.Airline,
                        stand: obj.Gate,
                        eobt: obj.ScheduledTime ? obj.ScheduledTime.slice(11,16).replace(".", "") : "",
                        tobt: obj.ScheduledTime ? obj.ScheduledTime.slice(11,16).replace(".", "") : "",
                        ctot: ""
                    };
                });
                setFlights(data);
            });
    }, []);

    function getMinutes(str) {
        const h = parseInt(str.slice(0,2),10);
        const m = parseInt(str.slice(2),10);
        return h * 60 + m;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return (
        <div>
            <table className="w-full border-collapse">
          <caption class="caption-top text-gray-400 italic text-xl">
                Word definition and common questions can be found <a href="/eli5" target="_blank" class="underline text-blue-400">here</a>
            </caption>
            <thead>
                <tr class="text-4xl">
                    <th class="px-4">Callsign</th>
                    <th class="px-4">Type</th>
                    <th class="px-4">Destination</th>
                    <th class="px-4">Stand</th>
                    <th class="px-4">EOBT</th>
                    <th class="px-4">TOBT</th>
                    <th class="px-4">CTOT</th>
                </tr>
            </thead>
                <tbody className="text-center">
                    {flights.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">No data</td>
                        </tr>
                    ) : (
                        flights.map(flight => {
                            const tobtMinutes = getMinutes(flight.tobt);
                            const diff = tobtMinutes - currentMinutes;
                            const highlight = diff >= -30 && diff <= 5;
                            return (
                                <tr key={flight.callsign} className={`border border-gray-300 dark:border-gray-600 font-medium text-xl ${highlight ? "bg-yellow-500 text-gray-950" : ""}`}>
                                    <td>{flight.callsign}</td>
                                    <td>{flight.type}</td>
                                    <td>{flight.dest}</td>
                                    <td>{flight.stand}</td>
                                    <td>{flight.eobt}</td>
                                    <td>{flight.tobt}</td>
                                    <td>{flight.ctot ? flight.ctot : ""}</td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dispatch;