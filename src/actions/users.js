import { CREATE_USER, RETRIEVE_USERS, UPDATE_USER, DELETE_USER } from "./types";
import UserDataService from "../services/UserService";
export const createUser =
  (name, email, age, mobile, work, add, desc) => async (dispatch) => {
    try {
      const res = await UserDataService.create({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await UserDataService.getAll();
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserDataService.update(id, data);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserDataService.remove(id);
    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findUsersByTitle = (title) => async (dispatch) => {
  try {
    const res = await UserDataService.findByTitle(title);
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
