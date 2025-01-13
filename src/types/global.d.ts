import Place from "./src/Place";

declare global {
  interface Window {
    placesData: Place[];
  }
}
export {};