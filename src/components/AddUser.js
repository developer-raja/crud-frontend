import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions/users";
import { useHistory } from "react-router-dom";

const AddUser = () => {
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

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [nameErr, setNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [ageErr, setAgeErr] = useState({});
  const [mobileErr, setMobileErr] = useState({});
  const [workErr, setWorkErr] = useState({});
  const [addErr, setAddErr] = useState({});
  const [descErr, setDescErr] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    const { name, email, age, mobile, work, add, desc } = user;

    dispatch(createUser(name, email, age, mobile, work, add, desc))
      .then((data) => {
        setUser({
          id: data._id,
          name: data.name,
          email: data.email,
          age: data.age,
          mobile: data.mobile,
          work: data.work,
          add: data.add,
          desc: data.desc,
        });

        setSubmitted(true);
        history.push("/users");

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    saveUser();
  };

  const formValidation = () => {
    const nameErr = {};
    const emailErr = {};
    const ageErr = {};
    const mobileErr = {};
    const workErr = {};
    const addErr = {};
    const descErr = {};
    let isValid = true;
    if (user.name.trim().length === 0) {
      nameErr.nameShort = "Name is required";
      isValid = false;
    } else if (user.name.trim().length < 3) {
      nameErr.nameShort = "Please give more than 3 characters";
      isValid = false;
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email) {
      emailErr.emailShort = "Email is required";
      isValid = false;
    } else if (!reg.test(user.email)) {
      emailErr.emailShort = "Email is not valid";
      isValid = false;
    }

    if (user.age.trim().length === 0) {
      ageErr.ageShort = "Age is required";
      isValid = false;
    }

    if (user.mobile.trim().length === 0) {
      mobileErr.mobileShort = "Mobile number is required";
      isValid = false;
    } else if (user.mobile.trim().length < 10) {
      mobileErr.mobileShort = "Mobile number must be 10 digits";
      isValid = false;
    } else if (user.mobile.trim().length > 10) {
      mobileErr.mobileShort = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (user.work.trim().length === 0) {
      workErr.workShort = "Work is required";
      isValid = false;
    } else if (user.work.trim().length < 3) {
      workErr.workShort = "Please give more than 3 characters";
      isValid = false;
    }

    if (user.add.trim().length === 0) {
      addErr.addShort = "Address is required";
      isValid = false;
    } else if (user.add.trim().length < 3) {
      addErr.addShort = "Please give more than 3 characters";
      isValid = false;
    }

    if (user.desc.trim().length === 0) {
      descErr.descShort = "Description is required";
      isValid = false;
    } else if (user.desc.trim().length < 3) {
      descErr.descShort = "Please give more than 3 characters";
      isValid = false;
    }

    setNameErr(nameErr);
    setEmailErr(emailErr);
    setAgeErr(ageErr);
    setMobileErr(mobileErr);
    setWorkErr(workErr);
    setAddErr(addErr);
    setDescErr(descErr);

    return isValid;
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div className="col-md-6 offset-md-3 border p-4 mt-5">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control mt-1"
                id="name"
                value={user.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Enter Name"
              />
            </div>
            {Object.keys(nameErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {nameErr[key]}
                </div>
              );
            })}

            <div className="form-group mt-2">
              <label htmlFor="description">Email</label>
              <input
                type="email"
                className="form-control mt-1"
                id="email"
                value={user.email}
                onChange={handleInputChange}
                name="email"
                placeholder="Enter Email"
              />
            </div>
            {Object.keys(emailErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {emailErr[key]}
                </div>
              );
            })}
            <div className="form-group mt-2">
              <label htmlFor="description">Age</label>
              <input
                type="text"
                className="form-control mt-1"
                id="age"
                value={user.age}
                onChange={handleInputChange}
                name="age"
                placeholder="Enter Age"
              />
            </div>
            {Object.keys(ageErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {ageErr[key]}
                </div>
              );
            })}
            <div className="form-group mt-2">
              <label htmlFor="description">Mobile</label>
              <input
                type="number"
                className="form-control mt-1"
                id="mobile"
                value={user.mobile}
                onChange={handleInputChange}
                name="mobile"
                placeholder="Enter Mobile"
              />
            </div>
            {Object.keys(mobileErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {mobileErr[key]}
                </div>
              );
            })}
            <div className="form-group mt-2">
              <label htmlFor="description">Work</label>
              <input
                type="text"
                className="form-control mt-1"
                id="work"
                value={user.work}
                onChange={handleInputChange}
                name="work"
                placeholder="Enter Work"
              />
            </div>
            {Object.keys(workErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {workErr[key]}
                </div>
              );
            })}
            <div className="form-group mt-2">
              <label htmlFor="description">Address</label>
              <input
                type="text"
                className="form-control mt-1"
                id="add"
                value={user.add}
                onChange={handleInputChange}
                name="add"
                placeholder="Enter Address"
              />
            </div>
            {Object.keys(addErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {addErr[key]}
                </div>
              );
            })}
            <div className="form-group mt-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control mt-1"
                id="desc"
                value={user.desc}
                onChange={handleInputChange}
                name="desc"
                placeholder="Enter Description"
              />
            </div>
            {Object.keys(descErr).map((key, index) => {
              return (
                <div key={index} style={{ color: "red" }}>
                  {descErr[key]}
                </div>
              );
            })}

            <button className="btn btn-success mt-2">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddUser;
