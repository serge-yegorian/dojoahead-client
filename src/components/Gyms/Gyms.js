import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import './Gyms.scss'
import { Link, useParams, useLocation } from 'react-router-dom';


function Gyms() {
    const formRef = useRef();
    const { id } = useParams();
    const [gymsWithin, setGymsWithin] = useState([]);
    const [gymsNear, setGymsNear] = useState([]);
    const [newZip, setNewZip] = useState(null)
    const location = useLocation();
    let zip;
    if (!newZip) {
        zip = location.state ? location.state.zip : '';
    } else {
        zip = newZip
    }

    useEffect(() => {
        axios.get('http://localhost:5050/gyms')
            .then((response) => {
                const within = [];
                const near = [];
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].zip === zip) {
                        within.push(data[i]);
                    } else if (
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
            });
    }, [zip]);

    if (!(gymsWithin.length > 0) && !(gymsNear.length > 0)) {

        const findGym = (e) => {
            e.preventDefault();
            const zipData = formRef.current.zip.value;
            setNewZip(zipData)
            
            e.target.reset();
        }

        return (
            <div className='gyms__error'>
            <div className='gyms__loading'>
                <div className="gyms__header">
                    <form className="gyms__search-div" onSubmit={findGym} ref={formRef}>
                        <input className="gyms__search-bar" id="zip" type="text" maxLength="5" placeholder="search by zip code..." />
                        <button  className="gyms__search-button">🔍</button>
                    </form>
                </div>
                <p className='gyms__err-message'>No gyms were found near zip: {zip}</p>
            </div>
            </div>
        );
    } else {

    const findGym = (e) => {
        e.preventDefault();
        const zipData = formRef.current.zip.value;
        setNewZip(zipData)

    }

        return (
            <section className="gyms">
                
                <div className="gyms__header">
                    <form className="gyms__search-div" onSubmit={findGym} ref={formRef}>
                        <input className="gyms__search-bar" id="zip" type="text" maxLength="5" placeholder="search by zip code..." />
                        <button  className="gyms__search-button">🔍</button>
                    </form>
                </div>
                <div className='gyms__results'>
                    {gymsWithin.length > 0 ? <div className='gyms__array'>
                        <div className='gyms__array-header'>
                            <h2 className='gyms__h2'>Gyms within <span className='gyms__zip'>{zip}</span>:</h2>
                            {gymsWithin.map((gym) => {
                                const direction = `/gyms/${gym.id}`
                                return (
                                    <Link key={gym.id} to={direction}>
                                        <div className='gyms__container' key={gym.id}>
                                            <div className='gyms__top'>
                                                <img className='gyms__logo' src={gym.logo} />
                                                <h3 className='gyms__name'>{gym.name}</h3>
                                            </div>
                                            <div className='gyms__bottom'>
                                                <p className='gyms__address'>{gym.street}</p>
                                                <p className='gyms__address'>{gym.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div> : null}
                    {gymsNear.length > 0 ? <div className='gyms__array'>
                    <div className='gyms__array-header'>
                            <h2 className='gyms__h2'>Gyms near <span className='gyms__zip'>{zip}</span>:</h2>
                            {gymsNear.map((gym) => {
                                const direction = `/gyms/${gym.id}`
                                return (
                                    <Link key={gym.id} to={direction}>
                                        <div className='gyms__container'>
                                            <div className='gyms__top'>
                                                <img className='gyms__logo' src={gym.logo} />
                                                <h3 className='gyms__name'>{gym.name}</h3>
                                            </div>
                                            <div className='gyms__bottom'>
                                                <p className='gyms__address'>{gym.street}</p>
                                                <p className='gyms__address'>{gym.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div> : null}

                </div>

            </section>
        );
    }
}

export default Gyms;
