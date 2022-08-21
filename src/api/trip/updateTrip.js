import { BaseAPI } from "..";

const updateTrip = async (url, origin, destination, distance, estimate_time) => {
  const instance = BaseAPI();

  var data;
  try {
    const ret = await instance.patch(url, {
      pick_up_address_coordinates: {
        latitude: origin.coordinates.lat,
        longitude: origin.coordinates.lng,
      },
      drop_off_address_coordinates: {
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng,
      },
      estimate_time,
      distance,
    });
    data = ret.data;
  } catch (e) {
    if (e.response) {
      data = e.response;
    } else {
      data = null;
    }
  }

  return data;
};
export default updateTrip;
