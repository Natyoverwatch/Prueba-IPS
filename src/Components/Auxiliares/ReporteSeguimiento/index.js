import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Table, Select } from 'antd';
import { addData, getData, editData, deleteData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { FcPrevious, FcReading } from 'react-icons/fc'
import { NavbarAux } from '../NavbarAux';

const { Option } = Select

export default function ReporteSeguimiento() {

    //Id for updating specific supervisor 
    const [idEdit, setIdEdit] = useState(null)

    //Forms to control diferent modals
    const [formUpdatePaciente] = Form.useForm();
    const [formPersonal] = Form.useForm();

    //Estados para el control de las modales
    //Modal para creación de los supervisores
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Modal para la actualización de los supervisores
    const [isEditing, setisEditing] = useState(false)
    const [idPaciente, setIdPaciente] = useState("")
    //Global state
    const [state, setState] = useContext(AppContext)

    //Navegación a la página acorde a los supervisores
    const navigate = useNavigate();

    // Data preguntas personales
    const [dataSourcePersonales, setDataSourcePersonales] = useState([]);
    //Data pacientes
    const [dataSource, setDataSource] = useState([]);
    //Data seguimiento
    const [dataReportesSegimiento, setDataReportesSegimiento] = useState([]);

    //Obtención de los pacientes
    const getPaciente = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/personal`, state?.token)
        const filtro = getConstdata.filter(data => data.values.id_aux === state.user._id)
        setDataSource(filtro)
        console.log(filtro)
    }

    //Obtención de las preguntas
    const getSeguimiento = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/personal`, state?.token)
        const filtro2 = getConstdata.filter(data => data.values.id_aux === state.user._id)
        const getConstdata2 = await getData(`https://api.clubdeviajeros.tk/api/seguimiento`, state?.token)
        const filtro = getConstdata2.filter(data => data.values.id_aux === state.user._id)
        const getConstdataRisk = await getData(`https://api.clubdeviajeros.tk/api/risk`, state?.token)
        console.log(filtro)

        let array = []
        Object.entries(filtro).forEach((element) => {
            console.log(element[1])
            const newObject = filtro2.filter((a) => a._id === element[1].id_paciente)
            const newObject2 = getConstdataRisk.filter((a) => a._id === newObject[0]?.id_riesgo)

            array.push({
                _id: element[1]._id,
                nombre: newObject[0]?.values.name,
                identificacion: newObject[0]?.values.id_paciente,
                grisk: newObject2[0]?.name,
                fecha: element[1].createdAt,
            })
        })
        setDataReportesSegimiento(array)
        console.log(array)
        console.log(dataReportesSegimiento)
    }

    const getNameQuestions = async (values, data) => {
        let array = []
        Object.entries(values.values).forEach(([key, val]) => {
            const newObject = data.filter((a) => a._id === key)
            if (newObject.length > 0 && newObject[0].pregunta) {
                array.push({
                    id: key,
                    pregunta: newObject[0].pregunta,
                    respuesta: val
                })
            }
        })
        setDataSource(array)
    }

    // Creacion de pacientes
    const sendPersonal = async (values) => {
        const sendData = await addData({ id_riesgo: id, values }, `https://api.clubdeviajeros.tk/api/personal`, state?.token)
        console.log(sendData)
        if (sendData) getPaciente()
        formPersonal.resetFields()
    }
    //Borrar supervisor
    const deletePaciente = async (paciente) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/personal/${paciente}`, state?.token)
        if (data === 200) getPaciente()
    }
    //Editar supervisor y actualizar
    const editPaciente = (paciente) => {
        setisEditing(true)
        formUpdatePaciente.setFieldsValue(paciente.name);
        setIdEdit(paciente._id)

    }

    const updatePaciente = async (values) => {
        formPersonal.resetFields()
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/personal/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getPaciente() }
    }

    useEffect(() => {
        getPaciente()
        getSeguimiento()
        //getQuestions()
    }, [0])

    const columns = [
        {
            title: 'Identificacion del paciente',
            dataIndex: 'identificacion',
            key: 'id_paciente',
        },
        {
            title: 'Nombre del paciente',
            dataIndex: 'nombre',
            key: 'name'
        },
        {
            title: 'Grupo de riesgo',
            dataIndex: 'grisk',
            key: 'grisk'
        },
        {
            title: 'fecha',
            dataIndex: 'fecha',
            key: 'date'
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FcReading />
                        <Popconfirm title="Seguro deseas borrarlo?" onConfirm={() => deletePaciente(record._id)}>
                            <FiTrash2 />
                        </Popconfirm>
                    </div >
                );
            }
        }
    ]

    return (
        <div>
            <NavbarAux />
            <div className='div-arrow-back'>
                <FcPrevious size={35} onClick={() => navigate(-1)} className='backArrow' />
            </div>
            <Row className='styledRow'>
                <Col
                    className='styledColSupervisor'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 5, offset: 2 }}>
                    <Form
                        layout="vertical">
                        <Form.Item
                            label='Seleccione un paciente'
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={(e) => setIdPaciente(e)}
                            >
                                {dataSource.map((read, index) => (
                                    <Option
                                        key={index}
                                        value={read._id}>{read.values["name"]}
                                    </Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => idPaciente.length > 0 ? navigate(`/questionsgrisk/${idPaciente}`) : ""}> Siguiente</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col>
                    <Table columns={columns} dataSource={dataReportesSegimiento} rowKey="_id" />
                </Col>
            </Row>
            {/*Modal creacion supervisor*/}
            <Modal
                title="Creación paciente"
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false)
                    formPersonal.resetFields()
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setIsModalVisible(false)
                        formPersonal.resetFields()
                    }}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => {
                        setIsModalVisible(false)
                        formPersonal.submit()
                    }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={formPersonal} layout="vertical" onFinish={sendPersonal} >
                    <Form.Item
                        name="name"
                        label="Nombre completo del paciente"
                        rules={[{ required: true, message: 'Por favor ingresa un valor' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_paciente"
                        label="Número de identificacione del paciente"
                        rules={[{ required: true, message: 'Por favor ingresa un valor' }]}
                    >
                        <Input />
                    </Form.Item>
                    {dataSourcePersonales.map((read, index) => (
                        <Form.Item
                            key={index}
                            name={read._id}
                            label={read.pregunta}
                            rules={[{ required: true, message: 'Por favor ingresa un valor' }]}
                        >
                            <Input />
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
            {/* Modal para editar o actualizar el supervisor */}
            <Modal
                title="Actualización del nombre del supervisor"
                open={isEditing}
                onCancel={() => {
                    setisEditing(false)
                    formPersonal.resetFields()
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setisEditing(false)
                        formPersonal.resetFields()
                    }}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => { formUpdatePaciente.submit() }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={formUpdatePaciente} layout="vertical" onFinish={updatePaciente} >
                    <Form.Item
                        name="name"
                        label="Nombre completo del paciente"
                        rules={[{ required: true, message: 'Por favor ingresa un valor' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_paciente"
                        label="Número de identificacione del paciente"
                        rules={[{ required: true, message: 'Por favor ingresa un valor' }]}
                    >
                        <Input />
                    </Form.Item>
                    {dataSourcePersonales.map((read, index) => (
                        <Form.Item
                            key={index}
                            name={read._id}
                            label={read.pregunta}
                            rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                        >
                            <Input />
                        </Form.Item>))}
                </Form>
            </Modal>
        </div >
    )
}