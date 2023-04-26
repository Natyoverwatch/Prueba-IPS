import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home';
import Welcome from './Components/Welcome'
import GestUser from './Components/GestionDeUsuario'
import GruRiesgo from './Components/GruposDeRiego';
import Reports from './Components/Reportes'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Usuarios" element={<GestUser />} />
        <Route path="/griesgo" element={<GruRiesgo />} />
        <Route path="/reportes" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;