import axios from "axios";
import { API } from "../config";
import { getCookie } from "../actions/auth";

const token = getCookie("token");

let axiosAuthConfig = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const createBlog = (blog) => {
  return axios
    .post(`${API}/blog`, blog, axiosAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};