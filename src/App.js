import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Navbar } from './Components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
