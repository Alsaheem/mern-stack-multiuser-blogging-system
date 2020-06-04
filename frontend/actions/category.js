import axios from "axios";
import { API } from "../config";
import { getCookie } from "../actions/auth";

const token = getCookie("token");

let axiosAuthConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const createCategory = (category) => {
  return axios
    .post(`${API}/category`, category, axiosAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const getCategories = () => {
  return axios
    .get(`${API}/categories`, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const getCategory = (slug) => {
  return axios
    .get(`${API}/category/${slug}`, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const removeCategory = (slug) => {
  return axios
    .delete(`${API}/category/${slug}`, axiosAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};
