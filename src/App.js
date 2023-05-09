import { Route, BrowserRouter, Routes  } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Zip from './components/Zip/Zip';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/zip' element={<Zip/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
