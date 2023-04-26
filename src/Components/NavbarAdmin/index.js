import logo from '../../Images/logo.png'
import './style.scss'
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

export const NavbarAdmin = () => {
    const navigate = useNavigate();

    return (
        <div className='NavbarContainerComponentAdm'>
            <div className='stylelogoAdm'>
                <img src={logo} alt="logo" style={{ marginLeft: '4em' }} onClick={() => navigate('/')} />
                <p className='stylepAdm'>SISALUD</p>
            </div>
            <div className='stylelinkAdm'>
                <Link to='/usuarios'>
                    <h2 className='styleh2Adm'>Gestion de usuario</h2>
                </Link>
                <Link to='/griesgo'>
                    <h2 className='styleh2Adm'>Grupos de riesgo</h2>
                </Link>
                <Link to='/reportes'>
                    <h2 className='styleh2Adm'>Reportes</h2>
                </Link>
            </div>
            <div style={{ display: 'flex', marginRight: '4em', color: 'white' }}>
                <BsPersonCircle size={30} onClick={() => navigate('/login')} />
            </div>
        </div >
    )
}