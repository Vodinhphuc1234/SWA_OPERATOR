const { BaseAuthAPI } = require("..");

const login = async (params) => {
  const instance = BaseAuthAPI;
  var data;

  try {
    const ret = await instance.post("/operator/login/", {
      ...params,
    });

    data = ret.data;
  } catch (e) {
    console.log(e);
    data = e.response;
  }
  return data;
};

export default login;
