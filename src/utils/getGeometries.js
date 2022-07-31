const { default: axios } = require("axios");

const getGeometies = async (origin, destination) => {
  const ret = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
    {
      params: {
        geometries: "geojson",
        access_token: process.env.NEXT_PUBLIC_MAPBOX_API,
      },
      headers: {},
    }
  );

  return ret?.data?.routes[0]?.geometry;
};

export default getGeometies;
