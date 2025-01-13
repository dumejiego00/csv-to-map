import { writeFile } from "fs/promises";
import Place from "../types/Place";
import IWritable from "../types/IWritable";

export default class TextWriter implements IWritable {
  constructor() {}

  async write(places: Place[]): Promise<void> {
    let finalString = "";
    const categories: string[] = [];

    places.forEach((place) => {
      if (!categories.includes(place.category)) {
        categories.push(place.category);
      }
    });

    for (const category of categories) {
      finalString += `* ${category} *\n`;
      places
        .filter((place) => place.category === category)
        .forEach((place) => {
          finalString += `- ${place.name}\n  Address: ${place.address}\n  Description: ${place.description}\n\n`;
        });
    }

    try {
      await writeFile("places.txt", finalString);
      console.log("File 'places.txt' has been created successfully.");
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }
}