import { BaseAPI } from "..";

const addTrip = async (params) => {
  const instance = BaseAPI();
  console.log(params);

  var data;
  try {
    const ret = await instance.post("/operator/trips/", { ...params });
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

export default addTrip;
