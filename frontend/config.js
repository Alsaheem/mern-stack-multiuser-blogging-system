import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://testing.com"
  : "http://localhost:5000/api";
export const APP_NAME = publicRuntimeConfig.APP_NAME;
