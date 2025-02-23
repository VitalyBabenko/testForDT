import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  headers: {
    "x-api-key": process.env.SPOONACULAR_API_KEY,
    "Content-Type": "application/json",
  },
});
