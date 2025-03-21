import { readFile } from "node:fs/promises";
import Geocoder from "./Geocoder";
import Place from "../types/Place";

export default class CsvPlaceParser {
  private items: Place[] = [];
  private geocoder: Geocoder;

  private constructor(data: string) {
    this.geocoder = new Geocoder();
  }

  static async buildList(fileName: string): Promise<CsvPlaceParser> {
    const data = await readFile(fileName, "utf8");
    const parser = new CsvPlaceParser(data);
    await parser.parseFile(data);
    return parser;
  }

  private async parseFile(fileContent: string) {
    const lines = fileContent.split("\n").slice(1); 

    for (const line of lines) {
      const itemInfo = line.split(",");
      const address = itemInfo[1];

      const { lat, lng } = await this.geocoder.geocodeAddress(address);

      this.items.push({
        name: itemInfo[0],
        address: address,
        latitude: lat,
        longitude: lng,
        description: itemInfo[2],
        category:itemInfo[3]
      });
    }
  }

  getItems(): Place[] {
    return this.items;
  }

  public print(): void {
    console.log(this.items);
  }
}