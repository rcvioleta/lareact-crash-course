import axios from "axios";

import { useContext } from "react";
import UserContext from "./src/context/ContextProvider";

const { getAccessToken, deleteAccessToken } = useContext(UserContext);

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      deleteAccessToken();
    }
    throw error;
  }
);

export default axiosClient;
