import BaseAPI from ".";

export const getUser = async (props) => {
  let user = await BaseAPI.get("/users", { ...props });
  return user.data[0];
};
