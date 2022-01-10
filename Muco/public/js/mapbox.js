mapboxgl.accessToken =
  "pk.eyJ1IjoiYWdhcndhbHBhd2FuIiwiYSI6ImNreTR3eW4yNDAzb2Uydm5veHFkeWoxdjAifQ.i5eKK6RE-MdO2dWlFAGMog";
const option = {
  enableHighAccuracy: true,
};
let cordinate = [];
let map;
let mapMarkers = [];
navigator.geolocation.getCurrentPosition(
  loadmap,
  () => AlertBoxAppend("Position Not found"),
  Option
);
function loadmap(position) {
  const { latitude, longitude } = position.coords;

  map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/agarwalpawan/cky5u0h2o8u0314l5co951z2d", // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 13, // starting zoom
  });
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );
  map.on("click", (e) => {
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);
    setMarker([lng, lat]);
  });
}

function setMarker(cords) {
  mapMarkers.forEach((marker) => marker.remove());
  mapMarkers = [];
  const el = document.createElement("div");
  el.className = "marker";

  // Add marker
  const marker = new mapboxgl.Marker({
    id: "marker",
    element: el,
    anchor: "bottom",
  })
    .setLngLat(cords)
    .addTo(map);
  mapMarkers.push(marker);
  cordinate = cords;
}
