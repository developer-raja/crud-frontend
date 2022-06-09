import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/UserService";
import { useHistory } from "react-router-dom";

const User = (props) => {
  const initialUserState = {
    id: null,
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
    published: false,
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log("response", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      age: currentUser.age,
      mobile: currentUser.mobile,
      work: currentUser.work,
      add: currentUser.add,
      desc: currentUser.desc,
    };

    console.log("data", data);

    dispatch(updateUser(currentUser._id, data))
      .then((response) => {
        console.log(response);

        setCurrentUser({ ...currentUser });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateUser(currentUser._id, currentUser))
      .then((response) => {
        console.log(response);

        setMessage("The data was updated successfully!");
        history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeUser = () => {
    dispatch(deleteUser(currentUser._id))
      .then(() => {
        props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form col-md-6 offset-md-3 border p-4">
          <h4>Employees</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="description">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                value={currentUser.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Mobile</label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                name="mobile"
                value={currentUser.mobile}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Work</label>
              <input
                type="text"
                className="form-control"
                id="work"
                name="work"
                value={currentUser.work}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Address</label>
              <input
                type="text"
                className="form-control"
                id="add"
                name="add"
                value={currentUser.add}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="desc"
                name="desc"
                value={currentUser.desc}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="btn btn-danger mr-2 mt-2"
            onClick={() => {
              window.confirm("Are you sure you want to delete this?") &&
                removeUser();
            }}
          >
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success mt-2"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Employee...</p>
        </div>
      )}
    </div>
  );
};

export default User;
