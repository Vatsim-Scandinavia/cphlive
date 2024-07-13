//import metarParser from 'aewx-metar-parser';

function metarDecode(icao) {
    const response = fetch("https://metar.vatsim.net/"+icao)
    console.log(response)
}

export default metarDecode