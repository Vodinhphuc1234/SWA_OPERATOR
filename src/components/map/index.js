import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 11, lng: 107 };

const SimpleMap = ({
  origin,
  destination,
  setDistance,
  setDuration,
  setOrigin,
  setDestination,
}) => {
  ///get map
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    //get fit
    console.log(origin, destination);
    const southWest = new google.maps.LatLng(origin.coordinates.lat, origin.coordinates.lng);
    const northEast = new google.maps.LatLng(
      destination.coordinates.lat,
      destination.coordinates.lng
    );
    const bounds = new google.maps.LatLngBounds(southWest, northEast);
    map?.fitBounds(bounds);
    //get direction
    const asyncDirection = async () => {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: origin.coordinates,
        destination: destination.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setDirectionsResponse(results);
    };
    asyncDirection();
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    console.log("hello");
    setMap(null);
  }, []);

  //get direction
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    if (origin && destination) {
      //get fit
      const southWest = new google.maps.LatLng(origin.coordinates.lat, origin.coordinates.lng);
      const northEast = new google.maps.LatLng(
        destination.coordinates.lat,
        destination.coordinates.lng
      );
      const bounds = new google.maps.LatLngBounds(southWest, northEast);
      map?.fitBounds(bounds);

      //get direction
      const asyncDirection = async () => {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: origin.coordinates,
          destination: destination.coordinates,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        setDirectionsResponse(results);
      };
      asyncDirection();
    }
  }, [origin, destination]);

  //handle drag location:
  const handleDragOrigin = (event) => {
    const latLngObj = event.latLng;
    setOrigin({
      description: "Hello",
      coordinates: {
        lat: latLngObj.lat(),
        lng: latLngObj.lng(),
      },
    });
  };

  const handleDragDestination = (event) => {
    const latLngObj = event.latLng;
    setDestination({
      description: "Hello",
      coordinates: {
        lat: latLngObj.lat(),
        lng: latLngObj.lng(),
      },
    });
  };
  return (
    <GoogleMap
      ref={mapRef}
      center={center}
      zoom={3}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {origin && (
        <Marker
          position={{ ...origin.coordinates }}
          title={origin.description}
          onDragEnd={handleDragOrigin}
          zIndex={100000}
          draggable
        >
          {origin.description}
        </Marker>
      )}
      {destination && (
        <Marker
          position={{ ...destination.coordinates }}
          title={destination.description}
          onDragEnd={handleDragDestination}
          zIndex={100000}
          draggable
        >
          {destination.description}
        </Marker>
      )}

      {directionsResponse && (
        <DirectionsRenderer
          options={{
            markerOptions: {
              visible: false,
            },
            polylineOptions: {
              strokeColor: "#c23531",
            },
          }}
          directions={directionsResponse}
        />
      )}
    </GoogleMap>
  );
};

export default SimpleMap;
