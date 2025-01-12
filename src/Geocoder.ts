import axios from "axios";

export default class Geocoder {
  private apiKey: string;

  constructor() {
    // Get the API key from environment variables
    this.apiKey = process.env.OPENCAGE_API_KEY!;
  }

//   async geocodeAddress(address: string): Promise<{ lat: number; lng: number;}> {
//     // Construct the OpenCage API URL with the address and API key
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey}`;
//     console.log('url',url)

//     try {
//       const response = await axios.get(url);
//       const result = response.data.results[0]; // Get the first result from OpenCage

//       if (result) {
//         return {
//           lat: result.geometry.lat, // Latitude from OpenCage result
//           lng: result.geometry.lng, // Longitude from OpenCage result
//         };
//       }
//     } catch (error) {
//       console.error(`Geocoding failed for place: ${address}`, error);
//     }

//     // Return default fallback if no result or geocoding fails
//     return { lat: 0, lng: 0};
//   }
async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&no_dedupe=1`;

    try {
        const response = await axios.get(url);
        const result = response.data.results[0];

        if (result && result.geometry) {
            const location = result.geometry;
            console.log(`Geocoded ${address}: Latitude=${location.lat}, Longitude=${location.lng}`);
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error(`No geocoding results for address: ${address}`);
            return { lat: 0, lng: 0 }; // Default/fallback
        }
    } catch (error) {
        console.error(`Geocoding failed for address: ${address}`, error);
        return { lat: 0, lng: 0 }; // Default/fallback
    }
}

}
