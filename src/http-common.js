import axios from "axios";
export default axios.create({
  baseURL: "https://crud-mern-backend-asar.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
