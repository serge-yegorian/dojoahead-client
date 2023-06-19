import axios from "axios";
import "../AddGym.scss";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AddImages = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState('')
  const { gymId } = location.state;
  console.log(gymId)

  const next = () => {
    navigate(`/addmedialinks`, { state: { gymId } })
  }

    const selectLogo = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("logo", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('https://dojoahead.onrender.com/gyms/logo', formData)
    };

    const selectBackground = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("background", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('https://dojoahead.onrender.com/gyms/background', formData)
    };

    const selectSchedule = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("schedule", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('https://dojoahead.onrender.com/gyms/schedule', formData)
    };


  



  
  return (
    <form className="add" ref={formRef} encType="multipart/form-data">
      <div className="add__content">
        <h3 className="add__subheading">Upload Images:</h3>
        <div className="add__field add__field--image">
          <input
            className="add__input add__input--image invisible"
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={selectLogo}
          />
          <button
            className="add__input--image"
            type="button"
            onClick={() => document.getElementById("logo").click()}
          >
            
            📎 Logo
          </button>
        </div>

        <div className="add__field add__field--image">
          <input
            className="add__input add__input--image invisible"
            id="background"
            name="background"
            type="file"
            accept="image/*"
            onChange={selectBackground}
          />
          <button
            className="add__input--image"
            type="button"
            onClick={() => document.getElementById("background").click()}
          >

            📎 Background
          </button>
        </div>
        <div className="add__field add__field--image">
          <input
            className="add__input add__input--image invisible"
            id="schedule"
            name="schedule"
            type="file"
            accept="image/*"
            onChange={selectSchedule}
          />
          <button
            className="add__input--image"
            type="button"
            onClick={() => document.getElementById("schedule").click()}
          >

📎 Schedule
          </button>
        </div>
      </div>
      <div className="add__buttons">
        <Link to="/" className="add__cancel">
          Cancel
        </Link>

        <button className="add__submit" type="submit" onClick={next}>
          Next
        </button>
      </div>
    </form>
  );
};

export default AddImages;
