import './Zip.scss';
import {Link} from 'react-router-dom';

function Zip() {
    return (
        <section className='zip'>
            <form className='zip__form'>
                <div className='zip__form-input'>
                    <label className='zip__label'>
                        Zip Code:
                    </label>
                    <input className='zip__input' placeholder='33033' maxLength="5" type='zip'/>
                    <p className='zip__description'>
                        We will show you the best gyms in&nbsp;your&nbsp;area&nbsp;📍<br/><br/>


                    </p>
                </div>
                <Link to='/gyms'>
                    <button className="zip__button">
                        Enter zip
                    </button>
                </Link>
            </form>
        </section>
    )
}

export default Zip;

