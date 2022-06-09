import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers, findUsersByTitle } from "../actions/users";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (tutorial, index) => {
    setCurrentUser(tutorial);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findUsersByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Employees List</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={"list-group-item d-flex justify-content-between "}
                key={index}
              >
                {user.name}
                <div
                  className="btn btn-primary mr-0"
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                  View
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div className="card p-4 text-dark border shadow">
            <div class="card-header">Employees</div>
            <div className="card-body ">
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.name}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentUser.age}
              </div>
              <div>
                <label>
                  <strong>Mobile:</strong>
                </label>{" "}
                {currentUser.mobile}
              </div>
              <div>
                <label>
                  <strong>Work:</strong>
                </label>{" "}
                {currentUser.work}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentUser.add}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentUser.desc}
              </div>

              <Link
                to={"/users/" + currentUser._id}
                className="btn btn-warning mt-3"
              >
                Edit
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UsersList;
