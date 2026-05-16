import axios from "axios";

export const login = (data) => {
  return axios.post("http://localhost:3000/login", data, {
    withCredentials: true
  });
};

export const checkAuth = async () => {
  try {
    const res = await axios.get("http://localhost:3000/auth", {
      withCredentials: true
    });
    return res.data.authenticated;
  } catch {
    return false;
  }
};
