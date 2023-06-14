import axios from "axios";
import "./EditGym.scss";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditImages = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { gymId } = location.state;

    const selectLogo = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("logo", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('http://localhost:3001/gyms/logo', formData)
    };

    const selectBackground = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("background", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('http://localhost:3001/gyms/background', formData)
    };

    const selectSchedule = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("schedule", file);
        formData.append("gymId", gymId);
        formData.append("upload_preset", "ml_default")
        axios.post('http://localhost:3001/gyms/schedule', formData)
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
            <span className="material-symbols-outlined icon">upload_file</span>
            Logo
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
            <span className="material-symbols-outlined icon">upload_file</span>
            Background
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
            <span className="material-symbols-outlined icon">upload_file</span>
            Schedule
          </button>
        </div>
      </div>
      <div className="add__buttons">
      <button to="/" className="add__cancel" onClick={()=>{navigate(-1)}}>
          Cancel
        </button>

        <button className="add__submit" type="button" onClick={()=>{navigate(-1)}}>
          Update
        </button>
      </div>
    </form>
  );
};

export default EditImages;
