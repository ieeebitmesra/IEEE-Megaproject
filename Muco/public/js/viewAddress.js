const veiwAddressMap = document.querySelector(".viewAddress");
veiwAddressMap.addEventListener("click", () => {
  console.log("hello");
  let map2;
  const post = document.querySelector(".post__box");
  const cords = [
    Number(post.dataset.coordinate_lng),
    Number(post.dataset.coordinate_lat),
  ];
  console.log(cords);
  map2 = new mapboxgl.Map({
    container: "mapView", // container ID
    style: "mapbox://styles/agarwalpawan/cky5u0h2o8u0314l5co951z2d", // style URL
    center: cords, // starting position [lng, lat]
    zoom: 13, // starting zoom
    minpitch: 85,
  });
  map2.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );
  const el = document.createElement("div");
  el.className = "marker";
  const marker = new mapboxgl.Marker({
    id: "marker",
    element: el,
    anchor: "bottom",
  })
    .setLngLat(cords)
    .addTo(map2);
});
