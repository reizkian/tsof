import React from "react";
import MarkerClusterer from "@googlemaps/markerclustererplus";
// reactstrap components
import { Box, Card, CardHeader } from "@mui/material";
import geolocations from "system/views/Dashboard/_mocks_/geolocations";

const MapWrapper = ({ geolocations, ...rest }) => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "-2.870894";
    let lng = "117.953186";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 5,
      center: myLatlng,
      disableDefaultUI: true,
      zoomControl: true,
    };

    map = new google.maps.Map(map, mapOptions);

    const markers = geolocations.data.map((location, i) => {
      return new google.maps.Marker({
        position: location,
      });
    });

    new MarkerClusterer(map, markers, {
      imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
  }, [geolocations.data]);
  return (
    <>
      <div style={{ height: `500px` }} className="map-canvas" id="map-canvas" ref={mapRef} />
    </>
  );
};

const Map = () => {
  return (
    <>
      <Card>
        <CardHeader title="Distribusi Murid The School of Fire di Indonesia" subheader="by Google Geocoding API" />
        <div style={{ marginTop: "10px" }}>
          <MapWrapper geolocations={{ data: geolocations }} />
        </div>
      </Card>
    </>
  );
};

export default Map;
