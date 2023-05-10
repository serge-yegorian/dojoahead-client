import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';
import Choose from './components/Choose/Choose';
import Gyms from './components/Gyms/Gyms';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/zip' element={<Zip/>}/>
          <Route path='/choose' element={<Choose/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
