let map: google.maps.Map;
let currentInfoWindow: google.maps.InfoWindow | null = null;

export async function initMap(): Promise<void> {
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

  const places = window.placesData;
  if (!places || places.length === 0) {
    console.error("No places data available.");
    return;
  }

   map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 13.5127, lng: 2.1128 },
    zoom: 2,
  });

  for (const place of places) {
    const position = { lat: place.latitude, lng: place.longitude };
    const marker = new google.maps.Marker({
      position,
      map,
      title: place.name,
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${place.name}</strong><br>${place.description}<br>${place.address}`,
    });

    marker.addListener("click", () => {
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      infoWindow.open({
        anchor: marker,
        map,
      });
      currentInfoWindow = infoWindow;
    });
  }
}

initMap().catch((error) => {
  console.error("An error occurred while initializing the map:", error);
});