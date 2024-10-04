export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWduaXRlamFzIiwiYSI6ImNtMW0wZWg5MzBmeHAycnNsaWYwejdraGQifQ.DeSTRAdO4qjflt3S4fBjUQ';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/agnitejas/cm1m2sxge00iy01pe3dei6x0w', // style URL
    scrollZoom: false,

    // center: [-118, 34], // starting position [lng, lat]
    // zoom: 9, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup
    new mapboxgl.Popup({ offset: 35 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  //padding the map to fit properly the markers in the view
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
