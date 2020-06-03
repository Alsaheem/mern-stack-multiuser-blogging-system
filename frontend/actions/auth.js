import fetch from "isomorphic-fetch";
import axios from "axios";
import { API } from "../config";
import cookie from "js-cookie";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const signup = (user) => {
  return axios
    .post(`${API}/signup`, user, axiosConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: error.response.data,
      };
    });
};

export const signin = (user) => {
  return axios
    .post(`${API}/signin`, user, axiosConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};
//remove cookie
export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key, { expires: 1 });
  }
};

//remove cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//set localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//get localStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//authenticate user by getting data and localstorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuthenticated = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
