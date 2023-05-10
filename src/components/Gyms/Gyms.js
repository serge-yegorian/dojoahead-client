import { useEffect, useState } from 'react';
import axios from "axios";
import './Gyms.scss'

function Gyms() {
    const [gymsWithin, setGymsWithin] = useState([]);
    const [gymsNear, setGymsNear] = useState([]);
    let zip = '33026'

    useEffect(() => {
        axios.get('http://localhost:5050/gyms')
            .then((response) => {
                const within = [];
                const near = [];
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].zip === zip) {
                        within.push(data[i])
                    } else if (data[i].zip[0] === zip[0] && data[i].zip[1] === zip[1]) {
                        near.push(data[i])
                    }
                }
                setGymsWithin(within);
                setGymsNear(near);
            });
    }, [zip]);

    if (!(gymsWithin.length > 0) && !(gymsNear.length > 0)) {
        return <div className='gyms__loading'>
            loading gyms...
        </div>
    } else {
        return (
            <section className="gyms">
                <div className="gyms__header">
                    <div className="gyms__search-div">
                        <input className="gyms__search-bar" type="text" maxLength="5" placeholder="search by zip code..." />
                        <button className="gyms__search-button">🔍</button>
                    </div>
                </div>
                <div className='gyms__results'>
                    {gymsWithin ? <div className='gyms__array'>
                        <div className='gyms__array-header'>
                            <h2 className='gyms__h2'>Gyms within <span className='gyms__zip'>{zip}</span>:</h2>
                            {gymsWithin.map((gym) => {
                                return (
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
                                )
                            })}
                        </div>
                    </div> : null}
                    {gymsNear ? <div className='gyms__array'>
                    <div className='gyms__array-header'>
                            <h2 className='gyms__h2'>Gyms outside <span className='gyms__zip'>{zip}</span>:</h2>
                            {gymsNear.map((gym) => {
                                return (
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
                                )
                            })}
                        </div>
                    </div> : null}


                </div>
            </section>
        )
    }
}

export default Gyms;