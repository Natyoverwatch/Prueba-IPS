import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAux } from '../NavbarAux';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { getData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
//Images
import mamografiaImage from '../../../Images/mamografia.png';
import sifilisImage from '../../../Images/sifilis.png';
import citologiaImage from '../../../Images/papilla.png';
import desnutricionImage from '../../../Images/desnutricion.png';
import edaImage from '../../../Images/diarrea.png';
import iraImage from '../../../Images/neumonia.png';
import mmeImage from '../../../Images/mme.png';
import addImage from '../../../Images/agregar-usuario.png';


export default function GruRiesgoAux() {
    //Obtener los parametros por supervisor su ID
    let { id } = useParams()

    //Global state
    const [state, setState] = useContext(AppContext)

    //Navegación a la página acorde al grupo de riesgo
    const navigate = useNavigate();

    //Data Aux risk groups
    const [dataSource, setDataSource] = useState([{ name: 'mme', _id: '646ec11e4a67e19f1b828b93' }]);

    //Diccionario de imagenes de lo grupos de riesgo
    const riskImages = {
        mamografía: mamografiaImage,
        sifilisgestacionalycongenita: sifilisImage,
        citologiaycolposcopia: citologiaImage,
        desnutrición: desnutricionImage,
        eda: edaImage,
        ira: iraImage,
        mme: mmeImage,
        add: addImage,
    }

    //Función para encontrar la imagen de cada grupo en relación al diccionario riksImages
    const filteredRisk = (riskGroup) => {
        const foundPair = Object.entries(riskImages).find(([key, value]) => key === riskGroup.replace(/\s+/g, ''));
        if (foundPair) {
            const [key, value] = foundPair;
            return value
        } else {
            console.log('Pair not found.');
        }
    }

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        setState({ ...state, id_auxiliar: id })
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/risk/${id}`, state?.token)
        setDataSource(getConstdata);
    }


    useEffect(() => {
        /* getRisks()*/
        console.log(state)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <NavbarAux />
            <Row className='styledRow'>
                {
                    dataSource.map((read, index) => (
                        <Col
                            className='styledColGrisk'
                            xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}
                            key={index}>
                            <Row className='styledRow2' onClick={() => navigate(`/questionsgrisk/${read._id}`)}>
                                <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}>{read.name} </h1>
                                <img src={filteredRisk(read.name)} alt={read.name + "imagen"} />
                            </Row>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

