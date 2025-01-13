# Map CSV Project

A project that visualizes places from a CSV file on a Google Map and generates a text file categorizing these places.

## Features

- Parses a CSV file of places (Name, Address, Description, Category).
- Geocodes addresses using the OpenCage API.
- Displays locations on Google Maps.
- Categorizes and writes place data to a `places.txt` file.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- API Keys for:
  - **Google Maps JavaScript API** (for map display).
  - **OpenCage Geocoding API** (for address geocoding).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/map_csv.git
   cd map_csv
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure API Keys:**

   Create a `.env` file in the root directory:

   Add your API keys:

   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   OPENCAGE_API_KEY=your_opencage_api_key
   ```

   - Get a Google Maps API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
   - Get an OpenCage API key [here](https://opencagedata.com/).

## Usage

### Development Server

```bash
npm run start
```

This will:
- Parse the CSV (`places.csv`).
- Generate `places.txt` with categorized places.
- Launch a server displaying the map on `places.html`.

### Build for Production

```bash
npm run build
```

### Development (CSV Parsing Only)

```bash
npm run dev
```

## Project Structure

```
map_csv/
├── src/
│   ├── services/
│   │   ├── CsvPlaceParser.ts   # Parses the CSV file
│   │   ├── HtmlWriter.ts       # Handles HTML output
│   │   ├── TextWriter.ts       # Generates places.txt
│   │   └── Geocoder.ts         # Geocodes addresses using OpenCage API
│   ├── types/
│   │   └── Place.ts            # Interface for place data
│   └── main.ts                 # Main program logic
├── places.csv                  # Input CSV with place data
├── places.html                 # Map visualization
├── places.txt                  # Categorized text output
├── .env                        # API keys
├── package.json
├── package-lock.json
├── tsconfig.json
├── style.css
├── .gitignore
└── README.md
```

## Example CSV (`places.csv`)

```csv
Name,Address,Description,Category
Eiffel Tower,Av. Gustave Eiffel 75007 Paris France,Iconic Paris landmark,Landmark
Sydney Opera House,Bennelong Point Sydney NSW 2000 Australia,World-renowned performing arts center,Theater
Great Wall of China,Huairou District Beijing China,Ancient wall stretching over 13000 miles,Historical Site
Machu Picchu,Inca Trail 08680 Peru,Ancient Inca city located in the Andes,Historical Site
Christ the Redeemer,Parque Nacional da Tijuca Rio de Janeiro Brazil,Iconic statue overlooking the city,Landmark
```

## Output (`places.txt`)

```
* Landmark *
- Eiffel Tower
  Address: Av. Gustave Eiffel 75007 Paris France
  Description: Iconic Paris landmark

- Christ the Redeemer
  Address: Parque Nacional da Tijuca Rio de Janeiro Brazil
  Description: Iconic statue overlooking the city

* Theater *
- Sydney Opera House
  Address: Bennelong Point Sydney NSW 2000 Australia
  Description: World-renowned performing arts center

* Historical Site *
- Great Wall of China
  Address: Huairou District Beijing China
  Description: Ancient wall stretching over 13000 miles

- Machu Picchu
  Address: Inca Trail 08680 Peru
  Description: Ancient Inca city located in the Andes
```

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [Parcel](https://parceljs.org/)
- [Axios](https://axios-http.com/)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [OpenCage Geocoding API](https://opencagedata.com/)

## License

This project is licensed under the MIT License.