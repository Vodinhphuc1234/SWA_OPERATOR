import { faLocation, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConstructionOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ReactMapGL, { Layer, Marker, Source } from "react-map-gl";
import getDistanceAndDuration from "src/utils/getDistanceAndDuration";
import getGeometies from "src/utils/getGeometries";
import getLocationName from "src/utils/getLocationName";

const MapBox = ({ origin, destination, setDistance, setDuration, setOrigin, setDestination }) => {
  const [dataOne, setDataOne] = useState();
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 11,
    longitude: 108,
    zoom: 13,
  });

  const onLoad = async () => {
    if (origin && destination) {
      mapRef?.current?.fitBounds(
        [
          [destination.coordinates.lng, destination.coordinates.lat],
          [origin.coordinates.lng, origin.coordinates.lat],
        ],
        { padding: 40, duration: 1000 }
      );

      const durationAndDisTance = await getDistanceAndDuration(
        origin.coordinates,
        destination.coordinates
      );

      const geometries = await getGeometies(origin.coordinates, destination.coordinates);

      setDataOne({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [...geometries.coordinates],
        },
      });

      setDistance((durationAndDisTance.length / 1000).toFixed(2) + " km");
      setDuration((durationAndDisTance.duration / 60).toFixed(2) + " mins");
    }
  };

  const handleDragOriginEnd = async (e) => {
    const description = await getLocationName({ ...e.lngLat });
    setOrigin({
      description: description,
      coordinates: {
        ...e.lngLat,
      },
    });
  };

  const handleDragDestinationEnd = async (e) => {
    const description = await getLocationName({ ...e.lngLat });
    setDestination({
      description: description,
      coordinates: {
        ...e.lngLat,
      },
    });
  };

  useEffect(() => {
    if (origin && destination) {
      mapRef?.current?.fitBounds(
        [
          [destination.coordinates.lng, destination.coordinates.lat],
          [origin.coordinates.lng, origin.coordinates.lat],
        ],
        { padding: 40, duration: 1000 }
      );
      const asyncFunc = async (origin, destination) => {
        const durationAndDisTance = await getDistanceAndDuration(
          origin.coordinates,
          destination.coordinates
        );

        const geometries = await getGeometies(origin.coordinates, destination.coordinates);

        console.log(geometries);

        setDataOne({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [...geometries.coordinates],
          },
        });

        setDistance((durationAndDisTance.length / 1000).toFixed(2) + " km");
        setDuration((durationAndDisTance.duration / 60).toFixed(2) + " mins");
      };

      asyncFunc(origin, destination);
    }
  }, [origin, destination]);

  return (
    <ReactMapGL
      onLoad={onLoad}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
      initialViewState={{ ...viewport }}
      onViewportChange={(viewport) => setViewport({ viewport })}
    >
      {origin && (
        <Marker
          latitude={origin.coordinates.lat}
          longitude={origin.coordinates.lng}
          draggable
          onDragEnd={handleDragOriginEnd}
        >
          <FontAwesomeIcon icon={faMapPin} size="2xl" color="green" title={origin.description} />
        </Marker>
      )}
      {destination && (
        <Marker
          latitude={destination.coordinates.lat}
          longitude={destination.coordinates.lng}
          draggable
          onDragEnd={handleDragDestinationEnd}
        >
          <FontAwesomeIcon
            icon={faMapPin}
            size="2xl"
            color="blue"
            title={destination.description}
          />
        </Marker>
      )}

      {origin && destination && (
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "red",
              "line-width": 2,
            }}
          />
        </Source>
      )}
    </ReactMapGL>
  );
};

export default MapBox;