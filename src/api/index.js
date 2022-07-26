import axios from "axios";

const BaseAPI = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default BaseAPI;
