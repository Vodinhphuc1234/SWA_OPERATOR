import BaseAPI from "./index";

const getAllUsers = async (props) => {
  const users = await BaseAPI.get("users", { ...props });
  return users;
};

export default getAllUsers;
