import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.scss';
import Zip from './pages/Zip/Zip';
import Gyms from './pages/Gyms/Gyms';
import GymDetails from './pages/GymDetails/GymDetails';
import AddGym from './pages/AddGym/AddGym';
import Login from './pages/Login/Login';
import AddAddress from './pages/AddGym/AddAddress/AddAddress';
import { useCookies } from 'react-cookie';
import AddImages from './pages/AddGym/AddImages/AddImages';
import AddMedia from './pages/AddGym/AddMedia/AddMedia';
import Register from './pages/Register/Register';
import EditAddress from './pages/EditGym/EditAddress';
import EditImages from './pages/EditGym/EditMediaFiles';
import EditMediaLinks from './pages/EditGym/EditMediaLinks';
import EditGym from './pages/EditGym/EditGym';
import Profile from './pages/Profile/Profile';

function App() {

  const [cookies, setCooikes] = useCookies(['access_token'])

  return (
    <BrowserRouter>
      <main>
        <Routes>
          { !cookies.access_token || cookies.access_token.length < 10 ? <Route path='/add' element={<Zip/>}/>  : <Route path='/add' element={<AddGym/>}/>}
          <Route path='/' element={<Zip/>}/>
          <Route path='/enter' element={<Register/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path='/gyms/:id' element={<GymDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addaddress' element={<AddAddress/>}/>
          <Route path='/addimages' element={<AddImages/>}/>
          <Route path='/addmedialinks' element={<AddMedia/>}/>
          <Route path='/editaddress' element={<EditAddress/>}/>
          <Route path='/editmediafiles' element={<EditImages/>}/>
          <Route path='/editmedialinks' element={<EditMediaLinks/>}/>
          <Route path='/editgym' element={<EditGym/>}/>
          { !cookies.access_token || cookies.access_token.length < 10 ? <Route path='/profile' element={<Login/>}/> : <Route path='/profile' element={<Profile/>}/>}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
