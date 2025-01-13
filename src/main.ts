import HtmlWriter from "./services/HtmlWriter";
import CsvPlaceParser from "./services/CsvPlaceParser";
import TextWriter from "./services/TextWriter";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const csvParser = await CsvPlaceParser.buildList("places.csv");
  const textWriter = new TextWriter();
  const htmlWriter = new HtmlWriter();

  const places = csvParser.getItems();

  await textWriter.write(places);
  await htmlWriter.write(places);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
