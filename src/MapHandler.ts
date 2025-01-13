let map: google.maps.Map;

export async function initMap(): Promise<void> {
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

  const places = window.placesData;
  if (!places || places.length === 0) {
    console.error("No places data available.");
    return;
  }

  const firstPlace = places[0];
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: firstPlace.latitude, lng: firstPlace.longitude },
    zoom: 5,
  });

  // Add markers for each place
  for (const place of places) {
    const marker = new google.maps.Marker({
      position: { lat: place.latitude, lng: place.longitude },
      map,
      title: place.name,
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${place.name}</strong><br>${place.address}<br>${place.description}`,
    });

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map,
      });
    });
  }
}

initMap().catch((error) => {
  console.error("An error occurred while initializing the map:", error);
});
