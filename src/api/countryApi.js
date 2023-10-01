import axios from "axios";
const countryApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

countryApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.message || "Something went wrong...");
  }
);

export const getCountriesList = async () => {
  try {
    const res = await countryApi.get("/all");
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch data about countries from the API");
  }
};

export const getCountryByCode = async (code) => {
  try {
    const res = await countryApi.get(`/alpha/${code}`);
    return res.data[0];
  } catch (error) {
    console.log(error.message);
    throw new Error(`Failed to fetch data about ${code} country`);
  }
};

export const getCountryByName = async (name) => {
  try {
    const res = await countryApi.get(`/name/${name}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Failed to find "${name}" country`);
  }
};

export const getRegions = async () => {
  try {
    const res = await countryApi.get(`all?fields=subregion`);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Failed to fetch regions`);
  }
};

export const getCountryByRegion = async (region) => {
  try {
    const res = await countryApi.get(`subregion/${region}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Failed to find countries in ${region}`);
  }
};
