import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import './Gyms.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Gyms() {
    const formRef = useRef();
    // const { id } = useParams();
    const [gymsWithin, setGymsWithin] = useState([]);
    const [gymsNear, setGymsNear] = useState([]);
    const [newZip, setNewZip] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCooikes] = useCookies(['access_token'])
    let zip;
    if (!newZip) {
        zip = location.state ? location.state.zip : '';
    } else {
        zip = newZip
    }

    useEffect(() => {
        axios.get('http://localhost:3001/gyms')
            .then((response) => {
                const within = [];
                const near = [];
                const data = response.data;
                console.log(data)
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
                        <input className="gyms__search-bar" id="zip" type="text" maxLength="5" minLength='5' placeholder="search by zip code..." />
                        <button  className="gyms__search-button">🔍</button>
                    </form>
                </div>
                <p className='gyms__err-message'>No gyms were found near you&nbsp;😞</p>
                <div className='empty'></div>
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
                    <img className='gyms__profile' src={require('../../images/profile.svg').default} onClick={()=>{cookies.access_token ? navigate("/") : navigate("/enter") }}/>
                    <form className="gyms__search-div" onSubmit={findGym} ref={formRef}>
                        <input className="gyms__search-bar" id="zip" type="text" maxLength="5" minLength='5' placeholder="search by zip code..." />
                        <button  className="gyms__search-button">🔍</button>
                    </form>
                </div>
                <div className='gyms__results'>
                    {gymsWithin.length > 0 ? <div className='gyms__array'>
                        <div className='gyms__array-header'>
                            <h2 className='gyms__h2'>Gyms within <span className='gyms__zip'>{zip}</span>:</h2>
                            {gymsWithin.map((gym) => {
                                const direction = `/gyms/${gym._id}`
                                return (
                                    <Link key={gym._id} to={direction}>
                                        <div className='gyms__container' key={gym.id}>
                                        <div className='gyms__top'>
                                                <img className='gyms__logo' src={gym.logo == "" ? require("../../images/defaultlogo.jpeg") : gym.logo} alt="gym logo" />
                                                <div className='gyms__bottom'>
                                                    <h3 className='gyms__name'>{gym.name}</h3>
                                                    <p className='gyms__address'>{gym.street}</p>
                                                    <p className='gyms__address'>{gym.city}</p>
                                                </div>
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
                                const direction = `/gyms/${gym._id}`
                                return (
                                    <Link key={gym._id} to={direction}>
                                    <div className='gyms__container' key={gym.id}>
                                    <div className='gyms__top'>
                                            <img className='gyms__logo' src={gym.logo == "" ? require("../../images/defaultlogo.jpeg") : gym.logo} alt="gym logo" />
                                            <div className='gyms__bottom'>
                                                <h3 className='gyms__name'>{gym.name}</h3>
                                                <p className='gyms__address'>{gym.street}</p>
                                                <p className='gyms__address'>{gym.city}</p>
                                            </div>
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
