import axios from "axios";

const API_URL = "https://dog.ceo/api/breeds/image/random";

export const LoginRequest = async (username, password) => {
  try {
    const response = await axios.get(API_URL);
    const dogImage = response.data.message;
    const validUsername = "admin";
    const validPassword = "1234";
    if (username === validUsername && password === validPassword) {
      return { success: true, user: { username: validUsername, image: dogImage } };
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
