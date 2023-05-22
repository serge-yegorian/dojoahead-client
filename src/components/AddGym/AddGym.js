import axios from 'axios';
import './AddGym.scss';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function AddGym() {
    const navigate = useNavigate();
    const formRef = useRef();
    const [id, setId] = useState([])
    const [gym, setGym] = useState({});


    const shareGym = (e) => {
        e.preventDefault();
        const name = formRef.current.name.value;
        const bio = formRef.current.bio.value;
        const street = formRef.current.street.value;
        const city = formRef.current.city.value;
        const zip = formRef.current.zip.value;
        const logo = 'http://localhost:5050/images/' + 'logo_' + Date.now().toString().slice(0, -3) + '.png';
        const background = 'http://localhost:5050/images/' + 'background_' + + Date.now().toString().slice(0, -3) + '.png';
        const schedule = 'http://localhost:5050/images/' + 'schedule_' + Date.now().toString().slice(0, -3) + '.png';
        const smoothcomp = formRef.current.smoothcomp.value;
        const website = formRef.current.website.value;
        const fb = formRef.current.fb.value;
        const insta = formRef.current.insta.value;
        const newGym = {
            name: name,
            bio: bio,
            smoothcomp: smoothcomp, 
            fb: fb, 
            insta: insta, 
            street: street, 
            city: city,
            zip: zip, 
            logo: logo, 
            background: background, 
            schedule: schedule, 
            website: website, 
        };

        let newGymObject;

        axios
            .post('http://localhost:5050/gyms', newGym)
            .then((res) => {
                const gymId = res.data[0];
                newGymObject = { ...newGym, id: gymId };

                const logoFile = formRef.current.logo.files[0];
                const backgroundFile = formRef.current.background.files[0];
                const scheduleFile = formRef.current.schedule.files[0];

                const logoData = new FormData();
                logoData.append('logo', logoFile);
                const backgroundData = new FormData();
                backgroundData.append('background', backgroundFile);
                const scheduleData = new FormData();
                scheduleData.append('schedule', scheduleFile);

                const uploadRequests = [
                    axios.post('http://localhost:5050/gyms/upload/logo', logoData),
                    axios.post('http://localhost:5050/gyms/upload/background', backgroundData),
                    axios.post('http://localhost:5050/gyms/upload/schedule', scheduleData)
                ];

                return Promise.all(uploadRequests);
            })
            .then((uploadResponses) => {
                const [logoResponse, backgroundResponse, scheduleResponse] = uploadResponses;

                const updatedGymObject = {
                    ...newGymObject,
                    logo: logoResponse.data,
                    background: backgroundResponse.data,
                    schedule: scheduleResponse.data
                };
                setGym(updatedGymObject);
                navigate(`/gyms/${newGymObject.id}`);

                formRef.current.reset();
            })
            .catch((error) => {
                console.error(error);
            });
    };





return (
    // enctype="multipart/form-data" method="post"
    <form className='add' onSubmit={shareGym} ref={formRef} >
        <h2 className='add__title'>Publish Your Gym:</h2>
        {/* <div className='add__section'>
            <h2 className='add__title'>Personal Info:</h2>
            <div className='add__content'>
                <div className='add__field'>
                    <label className='add__label' htmlFor='coachName'>Name:</label>
                    <input className='add__input' id='coachName' name='coachName' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='coachBio'>Bio:</label>
                    <textarea className='add__input add__input--textarea' name='coachBio' id='coachBio' placeholder='Experienced instructor, 1st degree black belt, ADCC champion' rows='4'>
                    </textarea>
                </div>
                <h3 className='add__subheading'>Media links:</h3>
                <div className='add__field'>
                    <label className='add__label' htmlFor='coachSmoothcomp'>Smoothcomp:</label>
                    <input className='add__input' id='coachSmoothcomp' name='coachSmoothcomp' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='facebook'>Facebook:</label>
                    <input className='add__input' id='facebook' name='facebook' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='instagrma'>Instagram:</label>
                    <input className='add__input' id='instagram' name='instagram' type='text' />
                </div>
            </div>
        </div> */}
        <div className='add__section'>
            <div className='add__content'>
                <div className='add__field'>
                    <label className='add__label' htmlFor='name'>Gym name:</label>
                    <input className='add__input' id='name' name='name' type='text' placeholder='10th Planet ' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='bio'>Gym bio:</label>
                    <textarea className='add__input add__input--textarea' id='bio' name='bio' placeholder='We have 4 IBJJF champions and crossfit area' rows='4'>
                    </textarea>
                </div>
            </div>
            <div className='add__content'>
                <h3 className='add__subheading'>Address:</h3>
                <div className='add__field'>
                    <label className='add__label' htmlFor='street'>Street:</label>
                    <input className='add__input' id='street' name='street' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='city'>City:</label>
                    <input className='add__input' id='city' name='city' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='zip'>Zip code:</label>
                    <input className='add__input' id='zip' name='zip' type='text' />
                </div>
            </div>
            <div className='add__content'>
                <h3 className='add__subheading'>Media files:</h3>
                {/* */}
                <div className="add__field add__field--image" >
                    <input className="add__input add__input--image invisible"  id="logo" name="logo" type="file" accept="image/*" onChange={(e) => {
                        const selectedFile = e.target.files[0];
                    }} />
                    {/* Fake one */}
                        <button className='add__input--image' type='button' onClick={() => document.getElementById("logo").click()}><span className="material-symbols-outlined icon">upload_file</span>Logo</button>
                    {/* */}
                </div>
                
                <div className="add__field add__field--image">
                    <input className="add__input add__input--image invisible" id="background" name="background" type="file" accept="image/*" onChange={(e) => {
                        const selectedFile = e.target.files[0];
                    }} />
                    {/* Fake one */}
                    <button className='add__input--image' type='button' onClick={() => document.getElementById("background").click()}><span className="material-symbols-outlined icon">upload_file</span>Background</button>
                    {/* */}
                </div>
                <div className='add__field add__field--image'>
                    <input className='add__input add__input--image invisible' id='schedule' name='schedule' type="file" accept="image/*" onChange={(e) => {
                        const selectedFile = e.target.files[0];
                    }} />
                    {/* Fake one */}
                    <button className='add__input--image' type='button' onClick={() => document.getElementById("schedule").click()}><span className="material-symbols-outlined icon">upload_file</span>Schedule</button>
                    {/* */}
                </div>
            </div>
            <div className='add__content'>
                <h3 className='add__subheading'>Media links:</h3>
                <div className='add__field'>
                    <label className='add__label' htmlFor='website'>Website:</label>
                    <input className='add__input' id='website' name='website' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='smoothcomp'>Smoothcomp:</label>
                    <input className='add__input' id='smoothcomp' name='smoothcomp' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='fb'>Facebook:</label>
                    <input className='add__input' id='fb' name='fb' type='text' />
                </div>
                <div className='add__field'>
                    <label className='add__label' htmlFor='insta'>Instagram:</label>
                    <input className='add__input' name='insta' id='insta' type='text' />
                </div>
            </div>
        
            <div className='add__buttons'>
                <Link to='/choose' className='add__cancel'>Cancel</Link>

                <button className='add__submit' type='submit'>Submit</button>

            </div>
            </div>
    </form>
)
}

export default AddGym;