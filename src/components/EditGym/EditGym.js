import axios from "axios";
import "./EditGym.scss";
import { useRef } from "react";
import {useNavigate, useLocation } from "react-router-dom";

function EditGym() {
    const formRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const {gymId} = location.state

  const onSubmit = (e) => {
    const name = formRef.current.name.value;
    const bio = formRef.current.bio.value;
    const phoneNumber = formRef.current.phoneNumber.value;
    const email = formRef.current.email.value;
    e.preventDefault();
    axios
      .post("https://dojoahead.onrender.com/gyms/updategym", {
        id: gymId,
        name,
        bio,
        phoneNumber,
        email
      })
      .then((res) => {
        console.log(res.data)
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(gymId);

  return (
    <form className="add" onSubmit={onSubmit} ref={formRef}>
      <div className="">
        <h2 className="add__subheading">Publish Your Gym:</h2>
        <div className="add__content">
          <div className="add__field">
            <label className="add__label" htmlFor="name">
              Gym name:
            </label>
            <input
              className="add__input"
              id="name"
              name="name"
              type="text"
              placeholder="10th Planet "
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="email">
              Gym email:
            </label>
            <input
              className="add__input"
              id="email"
              name="email"
              type="email"
              placeholder="dojo@gmail.com"
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="phoneNumber">
              Gym phone number:
            </label>
            <input
              className="add__input"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              maxLength="10"
              minLength="10"
              placeholder="561 000 0561 (no dashes or spaces)"
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="bio">
              Gym bio:
            </label>
            <textarea
              className="add__input add__input--textarea"
              id="bio"
              name="bio"
              placeholder="We have 4 IBJJF champions and crossfit area"
              required={true}
              maxLength={350}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="add__buttons">
        <button to="/" className="add__cancel" onClick={()=>{navigate(-1)}}>
          Cancel
        </button>

        <button className="add__submit" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default EditGym;
