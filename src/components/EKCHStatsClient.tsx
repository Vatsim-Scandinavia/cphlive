"client only";

import { useEffect, useState } from 'react';

interface Stats {
  prefiles: number;
  onGate: number;
  taxiOut: number;
  onStar: number;
  totalArrivals: number;
  totalDepartures: number;
}

const EKCHStatsClient = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchVatsimData = async () => {
      const res = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
      const data = await res.json();

      const airport = 'EKCH';
      const prefiles = data.prefiles.filter((f: any) => f.departure === airport).length;

      let onGate = 0;
      let taxiOut = 0;
      let onStar = 0;
      let totalArrivals = 0;
      let totalDepartures = 0;

      for (const pilot of data.pilots) {
        if (pilot.flight_plan) {
          if (pilot.flight_plan.departure === airport) {
            totalDepartures++;
          }
          if (pilot.flight_plan.arrival === airport) {
            totalArrivals++;
          }
        }

        if (pilot.departure_airport === airport && pilot.arrival_airport) {
          // Simple taxi out detection: on ground & speed > 0
          if (pilot.groundspeed > 0 && pilot.altitude < 500) {
            taxiOut++;
          }
          if (pilot.groundspeed === 0 && pilot.altitude < 100) {
            onGate++;
          }
        }

        if (pilot.arrival_airport === airport && pilot.flight_plan) {
          // Rough STAR detection: arriving, airborne, altitude between 5000-15000
          if (pilot.altitude > 5000 && pilot.altitude < 15000 && pilot.groundspeed > 100) {
            onStar++;
          }
        }
      }

      setStats({ prefiles, onGate, taxiOut, onStar, totalArrivals, totalDepartures });
    };

    fetchVatsimData();
    const interval = setInterval(fetchVatsimData, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div>Loading EKCH stats...</div>;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl max-w-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">EKCH Live VATSIM Stats</h2>
      <ul className="space-y-2">
        <li>📝 Prefiles: <strong>{stats.prefiles}</strong></li>
        <li>🅿️ On Gate: <strong>{stats.onGate}</strong></li>
        <li>🚕 Taxi Out: <strong>{stats.taxiOut}</strong></li>
        <li>🛬 On STAR: <strong>{stats.onStar}</strong></li>
        <li>📥 Arrivals: <strong>{stats.totalArrivals}</strong></li>
        <li>📤 Departures: <strong>{stats.totalDepartures}</strong></li>
      </ul>
    </div>
  );
};

export default EKCHStatsClient;
