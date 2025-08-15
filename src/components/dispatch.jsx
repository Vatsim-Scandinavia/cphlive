import React from "react";

const Dispatch = () => {
    const [flights, setFlights] = React.useState([]);

    React.useEffect(() => {
        fetch("/dispatch.csv")
            .then(r => r.text())
            .then(text => {
                const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length);
                if (lines.length < 2) return;
                const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
                const parseLine = (line) => {
                    const values = line.match(/("[^"]*"|[^",]+)(?=,|$)/g)?.map(v => v.replace(/"/g, "").trim()) || [];
                    const obj = {};
                    headers.forEach((h,i) => obj[h] = values[i] ?? "");
                    return obj;
                };

                const normTime = (t) => {
                    if (!t || t.startsWith("http")) return ""; // ignore links in TOBT column
                    const cleaned = t.replace(/[^0-9:]/g, "");
                    if (!cleaned) return "";
                    const parts = cleaned.split(":");
                    if (parts.length === 2) {
                        return parts[0].padStart(2,"0") + parts[1].padStart(2,"0");
                    }
                    if (cleaned.length === 4) return cleaned; // already HHMM
                    return "";
                };

                const data = lines.slice(1).map(parseLine).map(row => {
                    const eobt = normTime(row["EOBT"]);
                    const tobt = normTime(row["TOBT"]);
                    const ctotRaw = row["CTOT"]; 
                    const ctot = (ctotRaw && ctotRaw !== "NIL" && ctotRaw !== "Pending") ? normTime(ctotRaw) : "";
                    const standRaw = row["Stand Assignment"]; 
                    return {
                        callsign: row["Call Sign"],
                        origin: row["Origin"],
                        dest: row["Destination"],
                        stand: (standRaw && standRaw !== "Pending") ? standRaw : "",
                        eobt,
                        tobt: tobt || eobt, // fallback
                        ctot
                    };
                }).filter(f => f.callsign);

                // sort by EOBT ascending
                data.sort((a,b) => (a.eobt || "9999").localeCompare(b.eobt || "9999"));
                setFlights(data);
            })
            .catch(err => console.error("Failed to load dispatch.csv", err));
    }, []);

    const getMinutes = (str) => {
        if (!str || str.length < 4) return Number.POSITIVE_INFINITY;
        const h = parseInt(str.slice(0,2),10);
        const m = parseInt(str.slice(2,4),10);
        if (isNaN(h) || isNaN(m)) return Number.POSITIVE_INFINITY;
        return h * 60 + m;
    };

    const now = new Date();
    const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes(); // assume Z times

    return (
        <div>
            <table className="w-full border-collapse">
                <caption className="caption-top text-gray-400 italic text-xl">
                    Word definition and common questions can be found <a href="/eli5" target="_blank" className="underline text-blue-400">here</a>
                </caption>
                <thead>
                    <tr className="text-2xl md:text-3xl">
                        <th className="px-2 md:px-4">Callsign</th>
                        <th className="px-2 md:px-4">Origin</th>
                        <th className="px-2 md:px-4">Destination</th>
                        <th className="px-2 md:px-4">Stand</th>
                        <th className="px-2 md:px-4">EOBT</th>
                        <th className="px-2 md:px-4">TOBT</th>
                        <th className="px-2 md:px-4">CTOT</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {flights.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">No data</td>
                        </tr>
                    ) : (
                        flights.map(flight => {
                            const reference = flight.tobt || flight.eobt;
                            const refMinutes = getMinutes(reference);
                            const diff = refMinutes - currentMinutes;
                            const highlight = diff >= -30 && diff <= 5;
                            return (
                                <tr key={flight.callsign} className={`border border-gray-300 dark:border-gray-600 font-medium text-lg md:text-xl ${highlight ? "bg-yellow-500 text-gray-950" : ""}`}>
                                    <td>{flight.callsign}</td>
                                    <td>{flight.origin}</td>
                                    <td>{flight.dest}</td>
                                    <td>{flight.stand}</td>
                                    <td>{flight.eobt}</td>
                                    <td>{flight.tobt}</td>
                                    <td>{flight.ctot}</td>
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