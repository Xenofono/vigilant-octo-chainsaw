import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-3fb91.firebaseio.com/"
});

export default instance;