import axios from "axios";

const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${unsplashKey} `,
  },
});

unsplashApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error from unsplashApi:", error);
    return Promise.reject(error);
  }
);

export const getPhotos = async (tag, page = 1) => {
  try {
    const res = await unsplashApi.get(`/search/photos`, {
      params: {
        query: tag,
        page: page,
        per_page: 10,
        orientation: "portrait",
        w: 300,
      },
    });


    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch photos. Please try again later");
  }
};
