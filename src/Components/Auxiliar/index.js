import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAdmin } from '../NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Table, Select } from 'antd';
import { addData, getData, editData, deleteData } from "../../controller/control"
import { AppContext } from '../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const { Option } = Select

export default function Auxiliar() {

    //Id for updating specific supervisor 
    const [idEdit, setIdEdit] = useState(null)

    //Forms to control diferent modals
    const [formUpdateSupervisor] = Form.useForm();
    const [form] = Form.useForm();

    //Estados para el control de las modales
    //Modal para creación de los supervisores
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Modal para la actualización de los supervisores
    const [isEditing, setisEditing] = useState(false)
    const [idAuxiliar, setIdAuxiliar] = useState("")
    //Global state
    const [state, setState] = useContext(AppContext)

    //Navegación a la página acorde a los supervisores
    const navigate = useNavigate();

    //Data auxiliares
    const [dataSource, setDataSource] = useState([]);

    //Data risk groups
    const [dataGrupoRiesgo, setDataGrupoRiesgo] = useState([]);

    //Editar supervisor y actualizar
    const editSupervisor = (supervisor) => {
        setisEditing(true)
        formUpdateSupervisor.setFieldsValue(supervisor);
        setIdEdit(supervisor._id)

    }

    const updateSupervisor = async (values) => {
        form.resetFields()
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/supervisor/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getUsers() }
    }

    //Creación de un nuevo supervisor
    const createNewSupervisor = async (values) => {
        form.resetFields()
        setIsModalVisible(false);
        const data = await addData(values, "https://api.clubdeviajeros.tk/api/supervisor", state?.token)
        if (data) getUsers()
        console.log(data)
    };

    //Obtención de los supervisores
    const getUsers = async () => {
        const getConstdata = await getData("https://api.clubdeviajeros.tk/api/users", state?.token)
        console.log(getConstdata)
        const filteredData = getConstdata.filter(item => item.roll.toLowerCase() === "auxiliar")
        setDataSource([...dataSource, ...filteredData])

        console.log(dataSource)
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [])

    //Borrar supervisor
    const deleteSupervisor = async (supervisor) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/supervisor/${supervisor}`, state?.token)
        if (data === 200) getUsers()
    }

    const columns = [
        {
            title: 'Nombre del supervisor',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FiEdit onClick={() => {
                            editSupervisor(record)
                            form.resetFields()
                        }} />
                        <Popconfirm title="Seguro deseas borrarlo?" onConfirm={() => deleteSupervisor(record._id)}>
                            <FiTrash2 />
                        </Popconfirm>
                    </div >
                );
            }
        }
    ]

    return (
        <div>
            <NavbarAdmin />
            <Row className='styledRow'>
                <Col
                    className='styledColAuxiliar'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 5, offset: 2 }}>
                    <Form
                        layout="vertical">
                        <Form.Item
                            label='Seleccione un auxiliar'
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={(e) => setIdAuxiliar(e)}
                            >
                                {dataSource.map((read, index) => (
                                    <Option
                                        key={index}
                                        value={read._id}>{read.name}
                                    </Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => idAuxiliar.length > 0 ? navigate(`/griesgoaux/${idAuxiliar}`) : ""}> Siguiente</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col>
                    <Button style={{ float: 'right', marginBottom: '1rem' }} type="primary" onClick={() => { setIsModalVisible(true) }}>
                        Agregar asignacion de supervisor a auxiliar
                    </Button>
                    <Table columns={columns} dataSource={dataSource} rowKey="_id" />
                </Col>
            </Row>
            {/*Modal creacion supervisor*/}
            <Modal
                title="Asignacion de supervisor a auxiliar"
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setIsModalVisible(false)
                        form.resetFields()
                    }}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => {
                        form.submit()
                    }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={form} onFinish={createNewSupervisor}>
                    <Form.Item
                        name="name"
                        label="Nombre del auxiliar"
                        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Nombre del supervisor"
                        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal para editar o actualizar el supervisor */}
            <Modal
                title="Actualización del nombre del supervisor"
                open={isEditing}
                onCancel={() => {
                    setisEditing(false)
                    form.resetFields()
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setisEditing(false)
                        form.resetFields()
                    }}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={() => { formUpdateSupervisor.submit() }}>
                        Crear
                    </Button>,
                ]}>
                <Form form={formUpdateSupervisor} onFinish={updateSupervisor}>
                    <Form.Item name="name" label="Nombre del supervisor:">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}
