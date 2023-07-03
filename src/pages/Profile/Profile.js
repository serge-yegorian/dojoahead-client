import axios from "axios";
import { useEffect, useState } from "react";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Profile() {
  const navigate = useNavigate();
  const [gymsWithin, setGymsWithin] = useState([]);
  const [cookies, setCooikes] = useCookies(['access_token'])
  const userId = window.localStorage.getItem('userID');

  const logout = () => {
    setCooikes("access_token", "");
    window.localStorage.removeItem('userID');
    navigate('/gyms')
  }

  useEffect(() => {
    axios.get("https://starfish-app-2kjfy.ondigitalocean.app/gyms/user/" + userId)
      .then((response) => {
        setGymsWithin(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch gyms:", error);
      });
  }, [userId]);

  return (
    <section className="profile">
      <div className="profile__header">
        <div className="profile__image-div">
            <img
            className="profile__back"
            src={require("../../images/back.png")}
            alt="Back"
            onClick={() => {navigate("/gyms")}}
            />
        </div>
        <button type="button" className="profile__button profile__button--primary" onClick={()=>{navigate('/add')}}>Add Gym</button>
        <button type="button" className="profile__button" onClick={logout}>Log Out</button>
      </div>
      <div className="profile__gyms">
        <h2 className="profile__heading">Your Gyms:</h2>
        <div className="profile__gyms-array">
        {gymsWithin.map((gym) => (
          <Link className="profile__gym" key={gym._id} to={`/gyms/${gym._id}`}>
            <div className="gyms__container" key={gym.id}>
              <div className="gyms__top">
                <img
                  className="gyms__logo"
                  src={
                    gym.logo === ""
                      ? require("../../images/defaultlogo.jpeg")
                      : gym.logo
                  }
                  alt="gym logo"
                />
                <div className="gyms__bottom">
                  <h3 className="gyms__name">{gym.name}</h3>
                  <p className="gyms__address">{gym.street}</p>
                  <p className="gyms__address">{gym.city}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
            </div>
        </div>
    </section>
  );
}

export default Profile;
