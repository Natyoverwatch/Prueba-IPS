import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home';
import Welcome from './Components/Welcome'
import GestUser from './Components/GestionDeUsuario'
import GruRiesgo from './Components/GruposDeRiego';
import Reports from './Components/Reportes'
import Supervisor from './Components/Supervisor';
import Questions from './Components/Questions';

import MyProvider from "./Provider"

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Usuarios" element={<GestUser />} />
          <Route path="/griesgo/:id" element={<GruRiesgo />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="/questions/:id" element={<Questions />} />
          <Route path="/supervisor" element={<Supervisor />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;