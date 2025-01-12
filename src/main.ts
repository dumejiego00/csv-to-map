import CsvMenuParser from "./CsvPlaceParser";
import HtmlWriter from "./HtmlWriter";
// import TextWriter from "./TextWriter";

async function main() {
  const parser = await CsvMenuParser.buildList("places.csv");
  parser.print()
//   const writer1 = new TextWriter();
//   await parser.writeMenu(writer1);
//   const writer2 = new HtmlWriter();
//   await parser.writeMenu(writer2);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
