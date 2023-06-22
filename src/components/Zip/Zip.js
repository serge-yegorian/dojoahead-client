import './Zip.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef } from 'react';

function Zip() {
  const [zip, setZip] = useState('');
  const formRef = useRef();
  const navigate = useNavigate();

  const collectZip = (e) => {
    e.preventDefault();
    const enteredZip = formRef.current.elements.zip.value; // Update here
    setZip(enteredZip);
    navigate('/gyms', { state: { zip: enteredZip } });
  };

  return (
    <section className='zip'>
      <form className='zip__form' onSubmit={collectZip} ref={formRef}>
        <div className='zip__form-input'>
          <label className='zip__label' htmlFor='zip'>
            Zip Code:
          </label>
          <input
            className='zip__input'
            id='zip'
            placeholder='33033'
            maxLength='5'
            minLength='5'
            type='text'
            onChange={(e) => setZip(e.target.value)}
          />
          <p className='zip__description'>
            Welcome to <span className='zip__dojoahead'>dojoahead</span> 🥋
            <br />
            <br />
            Find best local martial&nbsp;arts&nbsp;gym&nbsp;📍
            <br />
            <br />
            App works only in&nbsp;the&nbsp;US&nbsp;🇺🇸 
            <br />
            <br />

          </p>
        </div>
        <div className='zip__bottom'>
          <p className='zip__dev-info'>If you want to add your gym, <Link className='zip__signup' to={'/enter'}>register!</Link></p>
          <button className='zip__button' type='submit'>Enter zip</button>
        </div>
      </form>
    </section>
  );
}

export default Zip;
