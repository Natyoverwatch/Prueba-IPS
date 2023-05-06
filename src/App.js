import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home';
import Welcome from './Components/Welcome'
import GestUser from './Components/GestionDeUsuario'
import GruRiesgo from './Components/GruposDeRiego';
import Reports from './Components/Reportes'
import GRDesnutricion from './Components/GruposDeRiego/Desnutricion';
import GREda from './Components/GruposDeRiego/Eda';
import GRIra from './Components/GruposDeRiego/Ira';
import GRMamografia from './Components/GruposDeRiego/Mamografia';
import GRMme from './Components/GruposDeRiego/Mme';
import GRSifilis from './Components/GruposDeRiego/Sifilis';
import GRCitologia from './Components/GruposDeRiego/Citologia';


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
        {/* Rutas Grupos de riesgo*/}
        <Route path="/mamografia" element={<GRMamografia/>}/>
        <Route path="/sifilis" element={<GRSifilis/>}/>
        <Route path="/citologia" element={<GRCitologia/>}/>
        <Route path="/desnutricion" element={<GRDesnutricion/>}/>
        <Route path="/eda" element={<GREda/>}/>
        <Route path="/ira" element={<GRIra/>}/>
        <Route path="/mme" element={<GRMme/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;