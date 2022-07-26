const { USER_LOGGIN } = require("./constant");

const createLogginAction = (payload) => {
  return {
    type: USER_LOGGIN,
    payload: {
      ...payload,
    },
  };
};

export default createLogginAction;
