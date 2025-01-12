// global.d.ts

import Place from "./src/Place";  // Adjust the path if needed

declare global {
  interface Window {
    placesData: Place[];
  }
}
export {};