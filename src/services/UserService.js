import http from "../http-common";
const getAll = () => {
  return http.get("/getdata");
};
const get = (id) => {
  return http.get(`/getuser/${id}`);
};
const create = (data) => {
  return http.post("/register", data);
};
const update = (id, data) => {
  return http.put(`/updateuser/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/deleteuser/${id}`);
};

// const findByTitle = (title) => {
//   return http.get(`/tutorials?title=${title}`);
// };
const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default UserService;
