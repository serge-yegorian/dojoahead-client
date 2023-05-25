import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';
import Gyms from './components/Gyms/Gyms';
import GymDetails from './components/GymDetails/GymDetails';
import AddGym from './components/AddGym/AddGym';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Zip/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path='/gyms/:id' element={<GymDetails/>}/>
          <Route path='/add' element={<AddGym/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
