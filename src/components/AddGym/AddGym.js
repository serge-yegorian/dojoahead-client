import axios from "axios";
import "./AddGym.scss";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddGym() {
  const navigate = useNavigate();

  const userID = window.localStorage.getItem("userID");

  const [gym, setGym] = useState({
    name: "",
    bio: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    zip: "",
    logo: "",
    background: "",
    schedule: "",
    website: "",
    fb: "",
    insta: "",
    smoothcomp: "",
    gymOwner: userID,
  });

  const [gymId, setGymId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGym({ ...gym, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/gyms", gym)
      .then((res) => {
        const generatedId = res.data._id;
        setGymId(generatedId);
        alert("Gym will be reviewed within the next 24 hours");
        navigate("/addaddress", { state: { gymId: generatedId } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(gymId);

  return (
    <form className="add" onSubmit={onSubmit}>
      <div className="">
        <h2 className="add__subheading">Publish Your Gym:</h2>
        <div className="add__content">
          <div className="add__field">
            <label className="add__label" htmlFor="name">
              Gym name:*
            </label>
            <input
              className="add__input"
              id="name"
              name="name"
              type="text"
              placeholder="10th Planet "
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="email">
              Gym email:*
            </label>
            <input
              className="add__input"
              id="email"
              name="email"
              type="email"
              placeholder="dojo@gmail.com"
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="phoneNumber">
              Gym phone number:*
            </label>
            <input
              className="add__input"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              maxLength="10"
              minLength="10"
              placeholder="561 000 0561 (no dashes or spaces)"
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="add__field">
            <label className="add__label" htmlFor="bio">
              Gym bio:*
            </label>
            <textarea
              className="add__input add__input--textarea"
              id="bio"
              name="bio"
              placeholder="We have 4 IBJJF champions and crossfit area"
              onChange={handleChange}
              required={true}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="add__buttons">
        <Link to="/" className="add__cancel">
          Cancel
        </Link>

        <button className="add__submit" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default AddGym;
