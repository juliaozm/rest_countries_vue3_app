import axios from "axios";
const googleKey = import.meta.env.VITE_GOOGLE_KEY;

const translateApi = axios.create({
  baseURL: "https://google-translate1.p.rapidapi.com",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": googleKey,
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
