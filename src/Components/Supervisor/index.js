import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Table, Select } from 'antd';
import { addData, getData, editData, deleteData } from "../../controller/control"
import { AppContext } from '../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const { Option } = Select

export default function Supervisor() {

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

    //Editar grupo de riesgo y actualizar
    const editRisk = (risk) => {
        setisEditing(true)
        formUpdateRisk.setFieldsValue(risk);
        setIdEdit(risk._id)

    }

    const updateRisk = async (values) => {
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/supervisor/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getRisks() }
    }

    //Creación de un nuevo grupo de riesgo
    const createNewRisk = async (values) => {
        setIsModalVisible(false);
        const data = await addData(values, "https://api.clubdeviajeros.tk/api/supervisor", state?.token)
        if (data) getRisks()
        console.log(data)
    };

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        const getConstdata = await getData("https://api.clubdeviajeros.tk/api/supervisor", state?.token)
        setDataSource(getConstdata);
        console.log(getConstdata)
    }

    useEffect(() => {
        getRisks()
        // eslint-disable-next-line
    }, [])

    //Borrar grupo de riesgo 
    const deleteRisk = async (risk) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/supervisor/${risk._id}`, state?.token)
        if (data === 200) getRisks()
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
                        <FiEdit onClick={() => editRisk(record)} />
                        <Popconfirm title="Seguro deseas borrarlo?" onConfirm={() => deleteRisk(record._id)}>
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
                    className='styledColSupervisor'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 5, offset: 2 }}>
                    <Form
                        layout="vertical">
                        <Form.Item
                            label='Seleccione un supervisor'
                        >
                            <Select style={{ width: '100%' }}>
                                {dataSource.map((read, index) => (
                                    <Option
                                        key={index}
                                        value={read.name}>{read.name}
                                    </Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => navigate('/griesgo')}> Siguiente</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col>
                    <Button style={{ float: 'right', marginBottom: '1rem' }} type="primary" onClick={() => { setIsModalVisible(true) }}>
                        Agregar supervisor
                    </Button>
                    <Table columns={columns} dataSource={dataSource} />
                </Col>
            </Row>
            {/*Modal creacion supervisor*/}
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
                        label="Nombre del supervisor"
                        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal for updating risk */}
            <Modal
                title="Actualización del nombre del supervisor"
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
                    <Form.Item name="name" label="Nombre del supervisor:">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
