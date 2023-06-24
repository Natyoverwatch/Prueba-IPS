import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Select, Table, Tabs, DatePicker } from 'antd';
import { addData, getData, editData, deleteData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FcReading, FcFinePrint } from "react-icons/fc";
import { SearchOutlined, AndroidOutlined, AppleOutlined } from "@ant-design/icons"
import { useParams } from 'react-router-dom';
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
    const [form] = Form.useForm();

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

    //Actualizar la pregunta
    const updateQuestions = async (values) => {
        form.resetFields()
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/questions/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getQuestions() }
    }

    //Creación de una nueva pregunta
    const createNewQuestion = async (values) => {
        form.resetFields()
        setIsModalVisible(false);
        const datos = {
            id_riesgo: id,
            tipo: values.tipo,
            pregunta: values.pregunta,
            name: values.name,
        }
        const data = await addData(datos, "https://api.clubdeviajeros.tk/api/questions", state?.token)
        if (data) getQuestions()
    };

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

    const items = [
        {
            key: '1',
            label:
                (<span >
                    <FcReading style={{ fontSize: '24px' }} />
                    Preguntas Personales
                </span>),
            children:
                (
                    <Form form={form} layout="vertical" /* onFinish={createNewQuestion} */>
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
                            <Button type='primary' /* onClick={} */> Enviar datos</Button>
                        </Form.Item>
                    </Form>
                ),
        },
        {
            key: '2',
            label:
                (<span >
                    <FcFinePrint style={{ fontSize: '24px' }} />
                    Preguntas de seguimiento
                </span>),
            children:
                (
                    <Form form={form} layout="vertical" /* onFinish={createNewQuestion} */>
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
                            <DatePicker />
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
            <Row className='styledRow'>
                <Col
                    className='styledColGrisk'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                    <Row className='styledRow2' onClick={() => { }}>
                        <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}> Preguntas Personales </h1>
                        <img src={ppersonal} alt={"ppersonal"} />
                    </Row>
                </Col>
                <Col
                    className='styledColGrisk'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                    <Row className='styledRow2' onClick={() => { }}>
                        <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}> Preguntas de seguimiento </h1>
                        <img src={pseguimiento} alt={"pseguimiento"} />
                    </Row>
                </Col>
            </Row>
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
