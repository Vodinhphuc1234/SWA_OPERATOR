const { BaseAPI } = require("..");

const getPrice = async (distance) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.post("/operator/trips/calculate-cash/", { distance });

    data = ret.data;
  } catch (e) {
    if (e.reponse) {
      data = e.reponse;
    } else {
      data = null;
    }
  }

  return data;
};

export default getPrice;
