import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { onUpdateUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

function Profile({ formData, setformData }) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="profile-div">
      <h4 className="profile-head">Profile information</h4>
      <div className="form-div">
        <div className="form-grid">
          <div>
            <label htmlFor="first">First name</label>
            <input
              type="text"
              name="first"
              id="first"
              value={formData.firstName}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  firstName: e.target.value,
                }));
              }}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="last">Last name</label>
            <input
              type="text"
              name="last"
              id="last"
              value={formData.lastName}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  lastName: e.target.value,
                }));
              }}
              className="input-box"
            />
          </div>
        </div>
        <div className="form-grid">
          <div>
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={formData.birthDate}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  birthDate: e.target.value,
                }));
              }}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              className="input-box"
              value={formData.gender}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  gender: e.target.value,
                }));
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-grid">
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              className="input-box"
              value={formData.email}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="off"
              value={formData.phone}
              onChange={(e) => {
                setformData((prevData) => ({
                  ...prevData,
                  phone: e.target.value,
                }));
              }}
              className="input-box"
            />
          </div>
        </div>
      </div>

      <div className="btn-div">
        <button
          type="submit"
          className="submit-btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(onUpdateUser(formData));
          }}
        >
          save changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
