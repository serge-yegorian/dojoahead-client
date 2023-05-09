import './Zip.scss';

function Zip() {
    return (
        <section className='zip'>
            <form className='zip__form'>
                <div className='zip__form-input'>
                    <label className='zip__label'>
                        Zip:
                    </label>
                    <input className='zip__input' placeholder='33033' type='zip'/>
                    <p className='zip__description'>
                        We will show the best gyms in&nbsp;your&nbsp;area&nbsp;📍<br/><br/>


                    </p>
                </div>
                <button className="zip__button">
                    Enter zip
                </button>
            </form>
        </section>
    )
}

export default Zip;

