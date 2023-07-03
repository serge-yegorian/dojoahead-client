import axios from "axios";
import "../AddGym.scss";
import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AddAddress = () => {
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
      .post("https://starfish-app-2kjfy.ondigitalocean.app/gyms/updateaddress", {
        id: gymId,
        street,
        city,
        zip
      })
      .then((res) => {
        console.log(res.data)
        navigate("/addimages", { state: { gymId } });
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
        <Link to="/" className="add__cancel">
          Cancel
        </Link>

        <button className="add__submit" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default AddAddress;
