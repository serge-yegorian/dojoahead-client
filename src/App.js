import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';
import Gyms from './components/Gyms/Gyms';
import GymDetails from './components/GymDetails/GymDetails';
import AddGym from './components/AddGym/AddGym';
import Login from './components/Login/Login';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCooikes] = useCookies(['access_token'])

  const logout = () => {
    setCooikes("access_token", "");
    window.localStorage.removeItem('userID');
    // navigate back to login
  }

  

  return (
    <BrowserRouter>
      <main>
        <Routes>
          { cookies.access_token ? <Route path='/add' element={<AddGym/>}/> : <Route path='/add' element={<Zip/>}/> }
          <Route path='/' element={<Zip/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path='/gyms/:id' element={<GymDetails/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
