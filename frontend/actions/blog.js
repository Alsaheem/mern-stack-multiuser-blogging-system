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

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  let newData = JSON.stringify(data)
  return axios
    .post(`${API}/blogs-categories-tags`, newData, axiosConfig)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};
