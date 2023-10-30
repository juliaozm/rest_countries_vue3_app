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
    console.error("Error from translateApi:", error);
    return Promise.reject(error);
  }
);

export const postTranslate = async (data) => {
  try {
    const res = await translateApi.post("/language/translate/v2", data);
    return res.data;
  } catch (error) {
    if (error.response.status === 429) {
      throw new Error("Exceeded the MONTHLY quota on the dev plan");
    }
    throw new Error("Failed to translate. Please try again");
  }
};
