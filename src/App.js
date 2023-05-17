import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';
import Choose from './components/Choose/Choose';
import Gyms from './components/Gyms/Gyms';
import GymDetails from './components/GymDetails/GymDetails';
import AddGym from './components/AddGym/AddGym';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Enter/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/zip' element={<Zip/>}/>
          <Route path='/choose' element={<Choose/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path='/gyms/:id' element={<GymDetails/>}/>
          <Route path='/add' element={<AddGym/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
