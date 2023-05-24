import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Modal, Button, Input, Row, Col, Popconfirm } from 'antd';
import { addData, getData, editData, deleteData } from "../../controller/control"
import { AppContext } from '../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
//Images
import mamografiaImage from '../../Images/mamografia.png';
import sifilisImage from '../../Images/sifilis.png';
import citologiaImage from '../../Images/papilla.png';
import desnutricionImage from '../../Images/desnutricion.png';
import edaImage from '../../Images/diarrea.png';
import iraImage from '../../Images/neumonia.png';
import mmeImage from '../../Images/mme.png';
import addImage from '../../Images/agregar-usuario.png';


export default function GruRiesgo() {

    let { id } = useParams()

    //Id for updating specific risk group
    const [idEdit, setIdEdit] = useState(null)

    //Forms to control diferent modals
    const [formUpdateRisk] = Form.useForm();
    const [form] = Form.useForm();

    //Estados para el control de las modales
    //Modal para creación de grupo de riesgo
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Modal para la actualización del grupo de riesgo
    const [isEditing, setisEditing] = useState(false)

    //Global state
    const [state, setState] = useContext(AppContext)

    //Navegación a la página acorde al grupo de riesgo
    const navigate = useNavigate();

    //Data risk groups
    const [dataSource, setDataSource] = useState([]);

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

    //Editar grupo de riesgo y actualizar
    const editRisk = (risk) => {
        setisEditing(true)
        formUpdateRisk.setFieldsValue(risk);
        setIdEdit(risk._id)

    }

    const updateRisk = async (values) => {
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/risk/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getRisks() }
    }

    //Creación de un nuevo grupo de riesgo
    const createNewRisk = async (values) => {
        setIsModalVisible(false);
        const datos = {
            name: values.name,
            id_supervisor: id,
        }
        const data = await addData(datos, "https://api.clubdeviajeros.tk/api/risk", state?.token)
        if (data) getRisks()

    };

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        setState({ ...state, id_supervisor: id })
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/risk/${id}`, state?.token)
        setDataSource(getConstdata);
    }

    useEffect(() => {
        getRisks()
        console.log(state)
        // eslint-disable-next-line
    }, [])

    //Borrar grupo de riesgo 
    const deleteRisk = async (risk) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/risk/${risk._id}`, state?.token)
        if (data === 200) getRisks()
    }

    return (
        <div>
            <NavbarAdmin />
            <Button type="primary" onClick={() => { setIsModalVisible(true) }}>
                Abrir Modal
            </Button>
            <Modal
                title="Creación grupo de riesgo"
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false)
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => {
                        form.submit()
                    }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={form} onFinish={createNewRisk}>
                    <Form.Item
                        name="name"
                        label="Nombre grupo de riesgo"
                        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Row className='styledRow'>
                {
                    dataSource.map((read, index) => (
                        <Col
                            className='styledCol'
                            xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 5, offset: 2 }}
                            key={index}
                            onClick={() => navigate(read.urlnavigate)}>
                            <h1 style={{ textTransform: "capitalize" }}>{read.name} </h1>
                            <img src={filteredRisk(read.name)} alt={read.name + "imagen"} />
                            <Row style={{ marginTop: "20px" }}>
                                <FiEdit onClick={() => editRisk(read)} />
                                <FiTrash2 onClick={() => deleteRisk(read)} />
                            </Row>
                        </Col>
                    ))
                }
            </Row>
            {/* Modal for updating risk */}
            <Modal
                title="Actualización del grupo de riesgo"
                open={isEditing}
                onCancel={() => setisEditing(false)}
                footer={[
                    <Button key="cancel" onClick={() => setisEditing(false)}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => { formUpdateRisk.submit() }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={formUpdateRisk} onFinish={updateRisk}>
                    <Form.Item name="name" label="Nombre grupo:">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

