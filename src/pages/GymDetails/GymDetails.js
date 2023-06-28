  import './GymDetails.scss';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams, useNavigate, useLocation} from 'react-router-dom';

  function GymDetails() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false)
    const endpoint = 'https://dojoahead.onrender.com/gyms/';
    const navigate = useNavigate();
    const gymId = id;
    const location = useLocation();
    const {state} = location;

    const goBack = () => {
      state && state.justAdded ? navigate('/profile') : navigate(-1);
    }

    const openContacts = () => {
      const contacts = document.querySelector(".gymdetails__hidden--contacts");
      const background = document.querySelector(".gymdetails");
      const buttons = document.querySelector(".gymdetails__buttons");
      contacts.style.display = "flex";
      background.style.filter = "blur(3px)";
      buttons.style.display = "none";
    }

    const openEdit = () => {
      const edit = document.querySelector(".gymdetails__hidden--edit");
      const background = document.querySelector(".gymdetails");
      const buttons = document.querySelector(".gymdetails__buttons");
      edit.style.display = "flex";
      background.style.filter = "blur(3px)";
      buttons.style.display = "none";
    }

    const closeContacts = () => {
      const edit = document.querySelector(".gymdetails__hidden--edit");
      const contact = document.querySelector(".gymdetails__hidden--contacts")
      const background = document.querySelector(".gymdetails");
      const buttons = document.querySelector(".gymdetails__buttons");
      edit.style.display = "none";
      contact.style.display = "none";
      background.style.filter = "none";
      buttons.style.display = "flex";
    }

    const deleteGym = () => {
      axios.delete(`${endpoint}${gymId}`)
      .then((response) => {
        alert('Gym was deleted successfully!')
        navigate("/gyms")
      })
      .catch((err) => {
        console.log(err.data)
      })
    }

    useEffect(() => {
      axios.get(`${endpoint}${id}`)
        .then((response) => {
          setData(response.data);
        });
    }, []);

    return (
      <div>
      <div className='gymdetails__hidden gymdetails__hidden--contacts'>
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
      <div className="gymdetails__hidden gymdetails__hidden--edit">
        <div className='empty'>
        </div>
          <div className='gymdetails__close' onClick={closeContacts}>
            <img className='gymdetails__close-image' src={require("../../images/close.svg").default}/>
          </div>
          <div className='gymdetails__editButtons'>
            <div className='gymdetails__button gymdetails__button--edit' onClick={()=>{navigate("/editgym",{ state: { gymId } } )}}>Name, Bio, Email, Phone Number</div>
            <div className='gymdetails__button gymdetails__button--edit' onClick={()=>{navigate("/editaddress",{ state: { gymId } } )}}>Address</div>
            <div className='gymdetails__button gymdetails__button--edit' onClick={()=>{navigate("/editmediafiles",{ state: { gymId } } )}}>Logo, Schedule, Backgound</div>
            <div className='gymdetails__button gymdetails__button--edit' onClick={()=>{navigate("/editmedialinks",{ state: { gymId } } )}}>Social Media Links</div>
          </div>
        <div className='empty'>
        <div className='gymdetails__button gymdetails__button--delete' onClick={deleteGym}>Delete Gym</div>
        </div>
      </div>
      <section className='gymdetails'>
        <div className='gymdetails__top'>
        <div className='gymdetails__header'>
        <img className='gymdetails__background' src={data.background == "" ? require("../../images/defaultbackground.jpeg") : data.background} alt="Gym Background" />
          <div className='gymdetails__logo-div'>
          <img className='gymdetails__logo' src={data.logo == "" ? require("../../images/defaultlogo.jpeg") : data.logo}   alt="Gym Logo" />
          </div>
          <h1 className='gymdetails__heading'>{data.name}</h1>
          <div className='gymdetails__address'>
            <p>{data.street}</p>
            <p>{data.city}</p>
          </div>
        </div>
        <div className='gymdetails__main'>
        {data.schedule === ""? "" : <button className='gymdetails__schedule-open' onClick={() => setOpen(!open)}>Schedule 🗓️</button>}
          <div className={`gymdetails__schedule-div${open? '--active': `--inactive`}`}>
            <img className={`gymdetails__schedule${open? '--active': `--inactive`}`} src={data.schedule} alt="Gym Schedule" />
          </div>

          <p className='gymdetails__bio'>{data.bio}</p>
        </div>
        
        <div className='gymdetails__footer'>
          <div className='gymdetails__left'>
            <p className='gymdetails__website'>
            {data.website === ""? "" : <a className='gymdetails__weblink' href={data.website} target="_blank" rel="noopener noreferrer">
                Website 🔗
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
          {window.localStorage.getItem("userID") === data.gymOwner ? <button className='gymdetails__button gymdetails__button--primary' onClick={openEdit}>Edit Gym</button> :  <button className='gymdetails__button gymdetails__button--primary' onClick={openContacts}>
          Contact
          </button>}
        </div>
      </section>
      </div>
    );
  }

  export default GymDetails;
