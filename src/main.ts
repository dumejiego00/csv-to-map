import HtmlWriter from "./HtmlWriter";

async function main() {
  const htmlWriter = new HtmlWriter();
  await htmlWriter.write();
  console.log("places.html created")
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
