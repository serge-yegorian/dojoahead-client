import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';
import Gyms from './components/Gyms/Gyms';
import GymDetails from './components/GymDetails/GymDetails';
import AddGym from './components/AddGym/AddGym';
import Login from './components/Login/Login';
import AddAddress from './components/AddGym/AddAddress/AddAddress';
import { useCookies } from 'react-cookie';
import AddImages from './components/AddGym/AddImages/AddImages';
import AddMedia from './components/AddGym/AddMedia/AddMedia';

function App() {

  const [cookies, setCooikes] = useCookies(['access_token'])

  const logout = () => {
    setCooikes("access_token", "");
    window.localStorage.removeItem('userID');
    // navigate back to login
  }

  console.log(cookies.access_token)

  

  return (
    <BrowserRouter>
      <main>
        <Routes>
          { !cookies.access_token || cookies.access_token.length < 10 ? <Route path='/add' element={<Zip/>}/>  : <Route path='/add' element={<AddGym/>}/>}
          <Route path='/' element={<Zip/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path='/gyms/:id' element={<GymDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addaddress' element={<AddAddress/>}/>
          <Route path='/addimages' element={<AddImages/>}/>
          <Route path='/addmedialinks' element={<AddMedia/>}/>


          

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
