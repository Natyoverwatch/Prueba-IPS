import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAux } from '../NavbarAux';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Modal, Button, Table } from 'antd';
import { getData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FcAlarmClock } from "react-icons/fc";
//Images
import mamografiaImage from '../../../Images/mamografia.png';
import sifilisImage from '../../../Images/sifilis.png';
import citologiaImage from '../../../Images/papilla.png';
import desnutricionImage from '../../../Images/desnutricion.png';
import edaImage from '../../../Images/diarrea.png';
import iraImage from '../../../Images/neumonia.png';
import mmeImage from '../../../Images/mme.png';
import addImage from '../../../Images/agregar-usuario.png';
import { FcPrevious } from "react-icons/fc";

export default function GruRiesgoAux() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    //Obtener los parametros por supervisor su ID
    let { id } = useParams()

    //Global state
    const [state, setState] = useContext(AppContext)

    //Navegación a la página acorde al grupo de riesgo
    const navigate = useNavigate();

    //Data supervisor
    const [dataSupervisor, setDataSupervisor] = useState([]);
    //Data Aux risk groups
    const [dataSource, setDataSource] = useState([]);
    //Data risk groups filter
    const [dataRiskSource, setRiskDataSource] = useState([]);
    //Data risk groups
    const [dataSourceRisk, setDataSourceRisk] = useState([]);

    //Obtención de asignaciones
    const getRisksAux = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/asignaciones/${state.user._id}`, state?.token)
        setDataSource(getConstdata);
    }

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/risk`, state?.token)
        setDataSourceRisk(getConstdata);
    }

    //Obtención de los supervisores
    const getSupervisor = async () => {
        const getConstdata = await getData("https://api.clubdeviajeros.tk/api/supervisor", state?.token)
        setDataSupervisor(getConstdata);
    }

    // filtro nombre supervisor
    const filterNameSupervisor = (a) => {
        const filtro = dataSupervisor.filter(data => data._id === a.id_supervisor)
        return (filtro[0]?.name)
    }
    // filtro nombre supervisor
    const filterRiskSupervisor = (a) => {
        const filtro = dataSourceRisk.filter(data => data._id === a.id_riesgo)
        return (filtro[0]?.name)
    }

    //Diccionario de imagenes de lo grupos de riesgo
    const riskImages = {
        mamografía: mamografiaImage,
        sifilisgestacionalycongenita: sifilisImage,
        citologiaycolposcopia: citologiaImage,
        desnutrición: desnutricionImage,
        eda: edaImage,
        ira: iraImage,
        mme: mmeImage,
    }

    //Función para encontrar la imagen de cada grupo en relación al diccionario riksImages
    const filteredRisk = (riskGroup) => {
        if (riskGroup) {
            const foundPair = Object.entries(riskImages).find(([key, value]) => key === riskGroup.split(" ").filter(Boolean).join(""));
            if (foundPair) {
                const [key, value] = foundPair;
                return value
            } else {
                console.log('Pair not found.');
            }
        }
    }

    useEffect(() => {
        getRisks()
        getSupervisor()
        getRisksAux()
        console.log(state)
        // eslint-disable-next-line
    }, [])

    const dataSourceTable = [
        {
            nombre: "Ernesto Beltran",
            riesgo: "Desnutricion"
        }
    ]

    const columns = [
        {
            title: 'Nombre del paciente',
            dataIndex: 'nombre',
            key: 'name'
        },
        {
            title: 'Riesgo',
            dataIndex: 'riesgo',
            key: 'risk'
        },
        {
            title: 'Acción',
            render: (a) => <FcAlarmClock />,
            key: 'alarm'
        }
    ]

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <div>
            <NavbarAux />
            <div className='div-arrow-back'>
                <FcPrevious size={35} onClick={() => navigate(-1)} className='backArrow' />
            </div>
            <Row className='styledRow'>
                {
                    dataSource.map((read, index) => (
                        <Col
                            className='styledColGrisk'
                            xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}
                            key={index}>
                            <Row className='styledRow2' onClick={() => navigate(`/creacionpaciente/${read.id_riesgo}`)}>
                                <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}>
                                    {filterNameSupervisor({ id_supervisor: read.id_supervisor })} - {filterRiskSupervisor({ id_riesgo: read.id_riesgo })}
                                </h1>
                                <img src={filteredRisk(filterRiskSupervisor({ id_riesgo: read.id_riesgo }))} alt={filterRiskSupervisor({ id_riesgo: read.id_riesgo }) + "image"} />
                            </Row>
                        </Col>
                    ))
                }
            </Row>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button type="primary" onClick={() => showModal()}>
                    Abrir Seguimientos del día
                </Button>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Table columns={columns} dataSource={dataSourceTable}/>  
                </div>
            </Modal>
        </div>
    )
}

