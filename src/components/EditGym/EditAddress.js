import axios from "axios";
import "./EditGym.scss";
import { useRef } from "react";
import {useNavigate, useLocation } from "react-router-dom";

const EditAddress = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { gymId } = location.state;

  const onSubmit = (e) => {
    const street = formRef.current.street.value;
    const city = formRef.current.city.value;
    const zip = formRef.current.zip.value;
    e.preventDefault();
    axios
      .post("http://localhost:3001/gyms/updateaddress", {
        id: gymId,
        street,
        city,
        zip
      })
      .then((res) => {
        console.log(res.data)
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="add" onSubmit={onSubmit} ref={formRef}>
      <div className="add__content">
        <h3 className="add__subheading">Address:</h3>
        <div className="add__field">
          <label className="add__label" htmlFor="street">
            Street:
          </label>
          <input
            className="add__input"
            id="street"
            name="street"
            type="text"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="city">
            City:
          </label>
          <input
            className="add__input"
            id="city"
            name="city"
            type="text"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="zip">
            Zip code:
          </label>
          <input
            className="add__input"
            id="zip"
            name="zip"
            type="text"
            maxLength={5}
          />
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
};

export default EditAddress;
