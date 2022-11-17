import axios from "libs/axios";

export const useCsrf = () => {
  return () => axios.get("/sanctum/csrf-cookie");
};
