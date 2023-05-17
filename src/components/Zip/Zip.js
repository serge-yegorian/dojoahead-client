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
            type='text'
            onChange={(e) => setZip(e.target.value)}
          />
          <p className='zip__description'>
            We will show you the best gyms in&nbsp;your&nbsp;area&nbsp;📍
            <br />
            <br />
          </p>
        </div>
        <button className='zip__button' type='submit'>Enter zip</button> {/* Remove Link wrapping */}
      </form>
    </section>
  );
}

export default Zip;
