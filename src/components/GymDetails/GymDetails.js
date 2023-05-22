import './GymDetails.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function GymDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false)
  const endpoint = '/gyms/';

  useEffect(() => {
    axios.get(`http://localhost:5050${endpoint}${id}`)
      .then((response) => {
        setData(response.data[0]);
      });
  }, []);

  

  return (
    <section className='gymdetails'>
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
        <button className='gymdetails__schedule-open' onClick={() => setOpen(!open)}>Schedule <span className="material-symbols-outlined">calendar_month</span></button>
        <div className={`gymdetails__schedule-div${open? '--active': `--inactive`}`}>
          <img className={`gymdetails__schedule${open? '--active': `--inactive`}`} src={data.schedule} alt="Gym Schedule" />
        </div>

        <p className='gymdetails__bio'>{data.bio}</p>
      </div>
      <div className='gymdetails__footer'>
        <div className='gymdetails__left'>
          <p className='gymdetails__website'>
            <a className='gymdetails__weblink' href={data.website} target="_blank" rel="noopener noreferrer">
              Website <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </p>
        </div>
        <div className='gymdetails__right'>
          <a className='gymdetails__icon-link' href={data.smoothcomp} target="_blank"><img className='gymdetails__icon' src={require('../../images/smoothcomp.png')} alt="Smoothcomp Icon" /></a>
          <a className='gymdetails__icon-link' href={data.fb} target="_blank"><img className='gymdetails__icon' src={require('../../images/facebook.png')} alt="Facebook Icon" /></a>
          <a className='gymdetails__icon-link' href={data.insta} target="_blank"><img className='gymdetails__icon' src={require('../../images/instagram.svg').default} alt="Instagram Icon" /></a>
        </div>
      </div>
    </section>
  );
}

export default GymDetails;
