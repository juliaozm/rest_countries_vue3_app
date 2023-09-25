import axios from "axios";
const translateApi = axios.create({
  baseURL: "https://google-translate1.p.rapidapi.com",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "bfcc5c731emshe5b92b815d30ae7p156066jsne2fe9e5cbbeb",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
});

translateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.message || "Something went wrong...");
  }
);

export const postTranslate = async (data) => {
  try {
    const res = await translateApi.post("/language/translate/v2", data);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to translate. Please try again");
  }
};
