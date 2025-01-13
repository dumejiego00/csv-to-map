import axios from "axios";

export default class Geocoder {
  private apiKey: string;

  constructor() {
    if (!process.env.OPENCAGE_API_KEY) {
        throw new Error("OPENCAGE_API_KEY is not defined in the environment variables.");
      }
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
}
