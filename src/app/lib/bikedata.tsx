


export default async function GetBikeData() {
    let endpoint = "http://api.citybik.es/v2/networks/wolf-ride-bike-share";
    const request = await fetch(endpoint);
    const response = await request.json();
    console.log(response.network.stations)
}