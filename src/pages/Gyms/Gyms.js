import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Gyms.scss';

function Gyms() {
  const formRef = useRef();
  const [gymsWithin, setGymsWithin] = useState([]);
  const [gymsNear, setGymsNear] = useState([]);
  const [newZip, setNewZip] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['access_token']);
  const zip = newZip || (location.state ? location.state.zip : '');
  const hasToken = window.localStorage.getItem("userID");

  useEffect(() => {
    axios
      .get('https://dojoahead.onrender.com/gyms/zip', {
        params: {
          zip: zip
        }
      })
      .then((response) => {
        const within = [];
        const near = [];
        const data = response.data;

        for (let i = 0; i < data.length; i++) {
          if (data[i].zip === zip && data[i].isApproved) {
            within.push(data[i]);
          } else if (
            data[i].isApproved &&
            zip &&
            zip.length >= 2 &&
            data[i].zip &&
            data[i].zip.startsWith(zip.substring(0, 2))
          ) {
            near.push(data[i]);
          }
        }

        setGymsWithin(within);
        setGymsNear(near);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [zip]);

  const findGym = (e) => {
    e.preventDefault();
    const zipData = formRef.current.zip.value;
    setNewZip(zipData);
    e.target.reset();
  };

  return (
    <section className="gyms">
      <div className="gyms__header">
        <img
          className="gyms__profile"
          src={require('../../images/profile.svg').default}
          onClick={() => {
            hasToken 
              ? navigate('/profile')
              : navigate('/enter');
          }}
        />
        <form className="gyms__search-div" onSubmit={findGym} ref={formRef}>
          <input
            className="gyms__search-bar"
            id="zip"
            type="text"
            maxLength="5"
            minLength="5"
            placeholder="Search by zip code..."
          />
          <button className="gyms__search-button">🔍</button>
        </form>
      </div>
      <div className="gyms__results">
      {gymsWithin.length === 0 && gymsNear.length === 0 ? (
  <p className="gyms__err-message">No gyms were found near you&nbsp;😞</p>
) : null}
        {gymsWithin.length > 0 && (
          <div className="gyms__array">
            <div className="gyms__array-header">
              <h2 className="gyms__h2">
                Gyms within <span className="gyms__zip">{zip}</span>:
              </h2>
              {gymsWithin.map((gym) => (
                <Link key={gym._id} to={`/gyms/${gym._id}`}>
                  <div className="gyms__container">
                    <div className="gyms__top">
                      <img
                        className="gyms__logo"
                        src={
                          gym.logo === ''
                            ? require('../../images/defaultlogo.jpeg')
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
        )}
        {gymsNear.length > 0 && (
          <div className="gyms__array">
            <div className="gyms__array-header">
              <h2 className="gyms__h2">
                Gyms near <span className="gyms__zip">{zip}</span>:
              </h2>
              {gymsNear.map((gym) => (
                <Link key={gym._id} to={`/gyms/${gym._id}`}>
                  <div className="gyms__container">
                    <div className="gyms__top">
                      <img
                        className="gyms__logo"
                        src={
                          gym.logo === ''
                            ? require('../../images/defaultlogo.jpeg')
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
        )}
      </div>
    </section>
  );
}

export default Gyms;
