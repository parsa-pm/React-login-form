import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route  path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Navigate to="/signup"/>} />
      </Routes>
    </div>
  );
}

export default App;
