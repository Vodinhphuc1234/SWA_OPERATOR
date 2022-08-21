import axios from "axios";
import { getCookie } from "cookies-next";
export const BaseAPI = (serverSidePrams) => {
  const token = serverSidePrams ? getCookie("token", { ...serverSidePrams }) : getCookie("token");
  return axios.create({
    baseURL: "http://127.0.0.1:8002",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
};

export const BaseAuthAPI = axios.create({
  baseURL: "http://127.0.0.1:8002",
});
