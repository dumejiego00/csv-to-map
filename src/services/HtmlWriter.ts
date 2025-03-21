import { writeFile } from "node:fs/promises";
import Place from "../types/Place";
import IWritable from "../types/IWritable";

export default class HtmlWriter implements IWritable{
  private apiKey: string;

  constructor() {
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      throw new Error("GOOGLE_MAPS_API_KEY is not defined in the environment variables.");
    }
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  }
  
  async write(places: Place[]): Promise<void> {

    const placesJson = JSON.stringify(places);

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <title>Simple Map</title>
          

          <link rel="stylesheet" type="text/css" href="./style.css" />
          <script>
            // Inject the places data for frontend use
            window.placesData = ${placesJson};
          </script>
          <script type="module" src="./src/services/mapHandler.ts"></script>
        </head>
        <body>
          <div id="map"></div>

          <!-- prettier-ignore -->
          <script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src="https://maps." + c + "apis.com/maps/api/js?" + e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
            ({key: "${this.apiKey}", v: "weekly"});</script>
        </body>
      </html>`;

    try {
      await writeFile("places.html", html);
      console.log("File 'places.html' has been created successfully.");
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }
}