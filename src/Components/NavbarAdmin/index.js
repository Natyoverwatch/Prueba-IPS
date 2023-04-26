import logo from '../../Images/logo.png'
import './style.scss'
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

export const NavbarAdmin = () => {
    const navigate = useNavigate();

    return (
        <div className='NavbarContainerComponent'>
            <div className='stylelogo'>
                <img src={logo} alt="logo" style={{ marginLeft: '4em' }} onClick={() => navigate('/')}/>
                <p className='stylep'>SISALUD</p>
            </div>
            <div className='stylelink'>
                <Link to='/usuarios'>
                    <h2>Gestion de usuario</h2>    
                </Link>
                <Link to='/griesgo'>
                    <h2>Grupos de riesgo</h2>
                </Link>
                <Link to='/reportes'>
                    <h2>Reportes</h2>
                </Link>
            </div>
            <div style={{ display: 'flex', marginRight: '4em', color: 'white' }}>
                <BsPersonCircle size={30} onClick={() => navigate('/login')} />
            </div>
        </div >
    )
}