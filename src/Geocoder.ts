import axios from "axios";

export default class Geocoder {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENCAGE_API_KEY!;
  }

async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey}&no_dedupe=1`;

    try {
        const response = await axios.get(url);
        const result = response.data.results[0];

        if (result && result.geometry) {
            const location = result.geometry;
            console.log(`Geocoded ${address}: Latitude=${location.lat}, Longitude=${location.lng}`);
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error(`No geocoding results for address: ${address}`);
            return { lat: 0, lng: 0 }; 
        }
    } catch (error) {
        console.error(`Geocoding failed for address: ${address}`, error);
        return { lat: 0, lng: 0 }; 
    }
}


// Enable billing on the Google Cloud Project to use their geocode API.
// async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
//     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         const result = response.data.results[0];
//         console.log('result', response)

//         if (result && result.geometry && result.geometry.location) {
//             const location = result.geometry.location;
//             console.log(`Geocoded ${address}: Latitude=${location.lat}, Longitude=${location.lng}`);
//             return { lat: location.lat, lng: location.lng };
//         } else {
//             console.error(`No geocoding results for address: ${address}`);
//             return { lat: 0, lng: 0 }; 
//         }
//     } catch (error) {
//         console.error(`Geocoding failed for address: ${address}`, error);
//         return { lat: 0, lng: 0 }; 
//     }
// }

}
