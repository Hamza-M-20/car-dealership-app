import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

const getUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return null;
  }
};

const index = async () => {
  return getUser();
};

export { index, getUser };
