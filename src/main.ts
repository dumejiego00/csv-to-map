import HtmlWriter from "./services/HtmlWriter";
import CsvPlaceParser from "./services/CsvPlaceParser";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const csvParser = await CsvPlaceParser.buildList("places.csv");
  const places = csvParser.getItems();

  const htmlWriter = new HtmlWriter();
  await htmlWriter.write(places);

  console.log("places.html created with map data.");
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
