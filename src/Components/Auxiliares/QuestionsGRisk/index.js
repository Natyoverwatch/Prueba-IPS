import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Select, Table, Tabs, DatePicker } from 'antd';
import { addData, getData, editData, deleteData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FcReading, FcFinePrint, FcPrevious } from "react-icons/fc";
import { SearchOutlined, AndroidOutlined, AppleOutlined } from "@ant-design/icons"
import { useParams, useNavigate } from 'react-router-dom';
import { NavbarAux } from '../NavbarAux';
import addImage from '../../../Images/agregar-usuario.png';
import ppersonal from '../../../Images/preguntapersonal.png'
import pseguimiento from '../../../Images/preguntaseguimiento.png'

export default function QuestionsGRisk() {
    let { id } = useParams()

    //Id for updating specific questions
    const [idEdit, setIdEdit] = useState(null)

    //Forms to control diferent modals
    const [formUpdateQuestions] = Form.useForm();
    const [formPersonal] = Form.useForm();
    const [formSeguimiento] = Form.useForm();

    const navigate = useNavigate();

    //Estados para el control de las modales
    //Modal para creación de las preguntas
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Modal para la actualización de las preguntas
    const [isEditing, setisEditing] = useState(false)

    //Global state
    const [state, setState] = useContext(AppContext)

    //Data de las preguntas
    const [dataSourcePersonales, setDataSourcePersonales] = useState([]);
    const [dataSourceSeguimiento, setDataSourceSeguimiento] = useState([]);

    const [dataRisk, setDataRisk] = useState([]);

    //Editar las preguntas y actualizar
    const editQuestions = (questions) => {
        setisEditing(true)
        formUpdateQuestions.setFieldsValue(questions);
        setIdEdit(questions._id)
    }

    

    //Obtención de las preguntas
    const getQuestions = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/questions/${id}`, state?.token)
        const filteredDataPersonales = getConstdata.filter(item => item.tipo === "personal")
        setDataSourcePersonales(filteredDataPersonales);
        const filteredDataSeguimiento = getConstdata.filter(item => item.tipo === "seguimiento")
        setDataSourceSeguimiento(filteredDataSeguimiento);
    }

    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line
    }, [])

    //Borrar pregunta 
    const deleteQuestions = async (questions) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/questions/${questions}`, state?.token)
        if (data === 200) getQuestions()
    }

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/risk/${state?.id_supervisor}`, state?.token)
        setDataRisk(getConstdata);
    }

    //
    const filterRisk = (a) => {
        const filtro = dataRisk.filter(data => data._id === a.id_riesgo)
        return (filtro[0]?.name)
    }

    const sendPersonalQuestions = async(values) => {
        const sendData = await addData({id_riesgo: id, values}, `https://api.clubdeviajeros.tk/api/personal`, state?.token)
        console.log(sendData)
    }

    const items = [
        {
            key: '1',
            label:
                (<span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                    <FcReading style={{ marginRight: '10px' }} size={30} />
                    Preguntas Personales
                </span>),
            children:
                (
                    <Form form={formPersonal} layout="vertical" onFinish={sendPersonalQuestions} >
                        {dataSourcePersonales.map((read, index) => (
                            <Form.Item
                                key={index}
                                name={read._id}
                                label={read.pregunta}
                                rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                            >
                                <Input />
                            </Form.Item>))}
                        <Form.Item>
                            <Button type='primary' htmlType="submit"> Enviar datos</Button>
                        </Form.Item>
                    </Form>
                ),
        },
        {
            key: '2',
            label:
                (<span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                    <FcFinePrint style={{ marginRight: '10px' }} size={30} />
                    Preguntas de seguimiento
                </span>),
            children:
                (
                    <Form form={formSeguimiento} layout="vertical" /* onFinish={createNewQuestion} */>
                        {dataSourceSeguimiento.map((read, index) => (
                            <Form.Item
                                key={index}
                                name={read._id}
                                label={read.pregunta}
                                rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                            >
                                <Input />
                            </Form.Item>))}
                        <Form.Item label="Próximo seguimiento">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item label="Observaciones">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' /* onClick={} */> Enviar datos</Button>
                        </Form.Item>

                    </Form>
                ),
        },
    ];

    return (
        <div>
            <NavbarAux />
            <div className='div-arrow-back'>
                <FcPrevious size={35} onClick={() => navigate(-1)} className='backArrow'/>
            </div>
            <Row className='styledRow'>
                <Col>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={items}
                    />
                </Col>
            </Row>
        </div>
    )
}
