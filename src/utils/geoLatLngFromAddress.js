import axios from "axios";

const getLatLng = async (address) => {
  console.log(process.env.NEXT_PUBLIC_HERE_MAP_API_KEY)
  const ret = await axios.get("https://geocoder.ls.hereapi.com/6.2/geocode.json", {
    params: {
      apiKey: process.env.NEXT_PUBLIC_HERE_MAP_API_KEY,
      searchText: address,
    },
  });

  return ret.data.Response.View[0].Result[0].Location.DisplayPosition;
};

export default getLatLng;
