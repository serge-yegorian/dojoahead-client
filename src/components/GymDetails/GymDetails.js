import './GymDetails.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GymDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false)
  const endpoint = '/gyms/';
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const openContacts = () => {
    const contacts = document.querySelector(".gymdetails__contacts");
    const background = document.querySelector(".gymdetails");
    contacts.style.display = "flex";
    background.style.filter = "blur(3px)"
  }

  const closeContacts = () => {
    const contacts = document.querySelector(".gymdetails__contacts");
    const background = document.querySelector(".gymdetails");
    contacts.style.display = "none";
    background.style.filter = "none";
  }

  useEffect(() => {
    axios.get(`http://localhost:3001${endpoint}${id}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  console.log(data)

  return (
    <div>
    <div className='gymdetails__contacts'>
      <div className='empty'></div>
      <div className='gymdetails__close' onClick={closeContacts}>
        <img className='gymdetails__close-image' src={require("../../images/close.svg").default}/>
      </div>
      <div className='gymdetails__contactButtons'>
        <a className='gymdetails__button gymdetails__button--contact' href={`mailto:${data.email}`}>{data.email}</a>
        <a className='gymdetails__button gymdetails__button--contact' href={`tel:${data.phoneNumber}`}>{data.phoneNumber ? <>({[data.phoneNumber[0], data.phoneNumber[1], data.phoneNumber[2]]}) {[data.phoneNumber[3], data.phoneNumber[4], data.phoneNumber[5]]} {[data.phoneNumber[6], data.phoneNumber[7], data.phoneNumber[8], data.phoneNumber[9]]}</> : ""}</a>
      </div>
      <div className='empty'>

      </div>
    </div>
    <section className='gymdetails'>
      <div className='gymdetails__top'>
      <div className='gymdetails__header'>
      <img className='gymdetails__background' src={data.background} alt="Gym Background" />
        <div className='gymdetails__logo-div'>
        <img className='gymdetails__logo' src={data.logo}   alt="Gym Logo" />
        </div>
        <h1 className='gymdetails__heading'>{data.name}</h1>
        <div className='gymdetails__address'>
          <p>{data.street}</p>
          <p>{data.city}</p>
        </div>
      </div>
      <div className='gymdetails__main'>
      {data.schedule === ""? "" : <button className='gymdetails__schedule-open' onClick={() => setOpen(!open)}>Schedule <span className="material-symbols-outlined">calendar_month</span></button>}
        <div className={`gymdetails__schedule-div${open? '--active': `--inactive`}`}>
          <img className={`gymdetails__schedule${open? '--active': `--inactive`}`} src={data.schedule} alt="Gym Schedule" />
        </div>

        <p className='gymdetails__bio'>{data.bio}</p>
      </div>
      
      <div className='gymdetails__footer'>
        <div className='gymdetails__left'>
          <p className='gymdetails__website'>
          {data.website === ""? "" : <a className='gymdetails__weblink' href={data.website} target="_blank" rel="noopener noreferrer">
              Website <span className="material-symbols-outlined">open_in_new</span>
            </a>}
          </p>
        </div>
        <div className='gymdetails__right'>
          {data.smoothcomp === ""? "" : <a className='gymdetails__icon-link' href={data.smoothcomp} target="_blank"><img className='gymdetails__icon' src={require('../../images/smoothcomp.png')} alt="Smoothcomp Icon" /></a>}
          {data.fb === ""? "" : <a className='gymdetails__icon-link' href={data.fb} target="_blank"><img className='gymdetails__icon' src={require('../../images/facebook.png')} alt="Facebook Icon" /></a>}
          {data.insta === ""? "" : <a className='gymdetails__icon-link' href={data.insta} target="_blank"><img className='gymdetails__icon' src={require('../../images/instagram.svg').default} alt="Instagram Icon" /></a>}
        </div>
      </div>
      </div>
      <div className='gymdetails__buttons'>
        <button className='gymdetails__button gymdetails__button--secondary' type='button' onClick={goBack}>
         Back
        </button>
        <button className='gymdetails__button gymdetails__button--primary' onClick={openContacts}>
         Contact
        </button>
      </div>
    </section>
    </div>
  );
}

export default GymDetails;
