import axios from "axios";
import "./EditGym.scss";
import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const EditMediaLinks = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { gymId } = location.state;

  const onSubmit = (e) => {
    const fb = formRef.current.fb.value;
    const insta = formRef.current.insta.value;
    const smoothcomp = formRef.current.smoothcomp.value;
    const website = formRef.current.website.value;
    const tapology = formRef.current.tapology.value;
    e.preventDefault();
    axios
      .post("http://localhost:3001/gyms/updatemedialinks", {
        id: gymId,
        fb,
        insta,
        smoothcomp,
        website,
        tapology
      })
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="add" onSubmit={onSubmit} ref={formRef}>
      <div className="add__content">
        <h3 className="add__subheading">Media links:</h3>
        <div className="add__field">
          <label className="add__label" htmlFor="website">
            Website:
          </label>
          <input
            className="add__input"
            id="website"
            name="website"
            type="text"
            placeholder="https://website.com"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="smoothcomp">
            Smoothcomp:
          </label>
          <input
            className="add__input"
            id="smoothcomp"
            name="smoothcomp"
            type="text"
            placeholder="https://smoothcomp.com"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="fb">
            Facebook:
          </label>
          <input
            className="add__input"
            id="fb"
            name="fb"
            type="text"
            placeholder="https://facebook.com"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="insta">
            Instagram:
          </label>
          <input
            className="add__input"
            name="insta"
            id="insta"
            type="text"
            placeholder="https://insta.com"
          />
        </div>
        <div className="add__field">
          <label className="add__label" htmlFor="tapology">
            Tapology:
          </label>
          <input
            className="add__input"
            id="tapology"
            name="tapology"
            type="text"
            placeholder="https://tapology.com"
          />
        </div>
      </div>
      <div className="add__buttons">
        <button
          to="/"
          className="add__cancel"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>

        <button className="add__submit" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditMediaLinks;
