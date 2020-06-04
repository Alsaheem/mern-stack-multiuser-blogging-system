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

export const createTag = (tag) => {
  return axios
    .post(`${API}/tag`, tag, axiosAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const getTags = () => {
  return axios
    .get(`${API}/tags`, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const getTag = (slug) => {
  return axios
    .get(`${API}/tag/${slug}`, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const removeTag = (slug) => {
  return axios
    .delete(`${API}/tag/${slug}`, axiosAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};
