import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home';
import Welcome from './Components/Welcome'
import GestUser from './Components/Administrador/GestionDeUsuario'
import GruRiesgo from './Components/Administrador/GruposDeRiego';
import Reports from './Components/Reportes'
import Supervisor from './Components/Administrador/Supervisor';
import Questions from './Components/Administrador/Questions';
import AdminAuxiliar from './Components/Administrador/Auxiliar';
import GruRiesgoAuxAdmin from './Components/Administrador/GruposDeRiesgoAuxiliares';

import MyProvider from "./Provider"
import GruRiesgoAux from './Components/Auxiliares/GruposRiesgo';
import QuestionsGRisk from './Components/Auxiliares/QuestionsGRisk';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          {/*Rutas para acceso Administrador*/}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Usuarios" element={<GestUser />} />
          <Route path="/griesgo/:id" element={<GruRiesgo />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="/questions/:id" element={<Questions />} />
          <Route path="/administrador/:id" element={<Supervisor />} />
          <Route path="/adminauxiliar" element={<AdminAuxiliar />} />
          <Route path="/griesgoauxadmin/:idaux/:idadm" element={<GruRiesgoAuxAdmin />} />
          {/*Rutas para acceso a auxiliares*/}
          <Route path="/auxiliar/:id" element={<GruRiesgoAux />} />
          <Route path="/questionsgrisk/:id" element={<QuestionsGRisk />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;