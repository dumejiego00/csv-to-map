import IWritable from "./IWritable";
import { readFile } from "node:fs/promises";
import * as dotenv from "dotenv";
import Geocoder from "./Geocoder"; // Import the Geocoder class
import Place from "./Place";

dotenv.config();

export default class CsvPlaceParser {
  private _csvData: string;
  private _items: Place[] = [];
  private geocoder: Geocoder;

  private constructor(data: string) {
    this._csvData = data;
    this.geocoder = new Geocoder(); // Initialize Geocoder instance
  }

  static async buildList(fileName: string): Promise<CsvPlaceParser> {
    const data = await readFile(fileName, "utf8");
    const parser = new CsvPlaceParser(data);
    await parser.parseFile(data);
    return parser;
  }

  private async parseFile(fileContent: string) {
    const lines = fileContent.split("\n").slice(1); // Skip header

    for (const line of lines) {
      const itemInfo = line.split(",");
      const address = itemInfo[1];
      console.log(address)

      // Use Geocoder class for geocoding
      const { lat, lng} = await this.geocoder.geocodeAddress(address);

      this._items.push({
        name: itemInfo[0],
        address: address,
        description: itemInfo[2],
        latitude: lat,
        longitude: lng,
        category: itemInfo[3],
      });
    }
  }

  getItems(): Place[] {
    return this._items;
  }

  public print(): void {
    console.log(this._items);
  }

  public async writeList(writer: IWritable) {
    writer.write(this._items);
  }
}
