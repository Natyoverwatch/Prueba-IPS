import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Button, Input, Row, Col } from 'antd';
import { addData, getData, editData, deleteData } from "../../controller/control"
import { AppContext } from '../../Provider';

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

    const riksImages = {
        mamografía: mamografiaImage,
        sifilisgestacionalycongenita: sifilisImage,
        citologia: citologiaImage,
        desnutrición: desnutricionImage,
        eda: edaImage,
        ira: iraImage,
        mme: mmeImage,
        add: addImage,
    }

    const filteredRisk = (riskGroup) => {
        const foundPair = Object.entries(riksImages).find(([key, value]) => key === riskGroup.replace(/\s+/g, ''));
        if (foundPair) {
            const [key, value] = foundPair;
            return value
        } else {
            console.log('Pair not found.');
        }
    }

    //Global state
    const [state, setState] = useContext(AppContext)

    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = Form.useForm();

    //Data risk groups
    const [dataSource, setDataSource] = useState([]);

    //Create new risk 
    const createNewRisk = async (values) => {
        setIsModalVisible(false);
        const data = await addData(values, "https://api.clubdeviajeros.tk/api/risk", state?.token)
        console.log(data)
    };

    const getRisks = async () => {
        const getConstdata = await getData("https://api.clubdeviajeros.tk/api/risk", state?.token)
        console.log(getConstdata)
        setDataSource(getConstdata);
    }

    useEffect(() => {
        getRisks()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <NavbarAdmin />
            <Button type="primary" onClick={() => { setIsModalVisible(true) }}>
                Abrir Modal
            </Button>
            <Modal
                title="Ejemplo de Modal con Formulario"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => { form.submit() }}>
                        Crear
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={createNewRisk}>
                    <Form.Item
                        name="name"
                        label="Nombre"
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
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

