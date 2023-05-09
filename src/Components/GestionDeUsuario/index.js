import React, { useState, useContext } from 'react'
import { Table, Button, Modal, Input, Row, Col, Form, Select } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { SearchOutlined } from "@ant-design/icons"
import "../GestionDeUsuario/style.scss"
import { NavbarAdmin } from '../NavbarAdmin';
import { addData } from "../../controller/control"
import { AppContext } from '../../Provider';

export default function GestUser() {

    const [form] = Form.useForm();

    const [isEditing, setisEditing] = useState(false)
    const [isUserEditing, setisUserEditing] = useState('')
    const [isAddNewUser, setisAddNewUser] = useState(false)

    const [state, setState] = useContext(AppContext)

    //Data people
    const [dataSource, setDataSource] = useState([]);


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'user',
            key: 'user',
            editable: true,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder='Escribe aquí'
                            onPressEnter={() => { confirm() }}
                            onBlur={() => { confirm() }}
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                                confirm({ closeDropdown: false })
                            }}
                        ></Input>
                    </>
                )
            },
            filterIcon: () => { return (<SearchOutlined />) },
            onFilter: (value, record) => { return record.nameuser.toLowerCase().includes(value.toLowerCase()) },
        },
        {
            title: 'Contraseña',
            dataIndex: 'pass',
            key: 'pass',
        },
        {
            title: 'Roll',
            dataIndex: 'roll',
            key: 'roll',
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {

                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FiEdit onClick={() => editUser(record)} />
                        {/* <Popconfirm title="Seguro deseas borrarlo?" onConfirm={() => deleteUser(record.key)}> */}
                        <FiTrash2 onClick={() => deleteUser(record.key)} />
                        {/* </Popconfirm> */}
                    </div >
                );
            }
        },
    ];


    //Delete specific user
    const deleteUser = (key) => {
        const newData = dataSource.filter((userData) => userData.key !== key);
        setDataSource(newData);
    }

    //Update info from user
    const editUser = (key) => {
        setisEditing(true)
        setisUserEditing({ ...key })
    }



    const onFinish = async (values) => {
        setisAddNewUser(false);
        const data = await addData(values, "https://2e45-147-75-123-138.ngrok-free.app/api/admin", state?.token)
        console.log(data);

    };


    return (
        <div>
            <NavbarAdmin />
            <div className='containeruser'>
                <div style={{ width: '100%' }}>
                    <Row style={{ display: 'flex', justifyContent: 'center', padding: '0 1em' }}>
                        <Col className='tableUser'>
                            <Button style={{ marginBottom: '2rem' }} onClick={() => { setisAddNewUser(true) }}>Agregar un nuevo usuario</Button>
                            <Table columns={columns} dataSource={dataSource} />
                            {/* Modal for updating users */}
                            <Modal
                                title="Modificación"
                                open={isEditing}
                                cancelText='Cancelar'
                                onCancel={() => { setisEditing(false); }}
                                okText='Guardar'
                                onOk={() => {
                                    setDataSource((pre) => {
                                        return pre.map((user) => { return user.key === isUserEditing.key ? isUserEditing : user })
                                    });
                                    setisEditing(false);
                                }}>
                                <label>Usuario:</label>
                                <Input value={isUserEditing?.user}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, user: e.target.value } }) }}
                                ></Input>
                                <label>Contraseña:</label>
                                <Input value={isUserEditing?.pass}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, pass: e.target.value } }) }}
                                ></Input>

                                <label>Roll:</label>
                                <Input value={isUserEditing?.roll}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, roll: e.target.value } }) }}
                                ></Input>
                            </Modal>
                            {/* Modal para la creación de usuarios */}
                            <Modal
                                title="Modal Title"
                                open={isAddNewUser}
                                onCancel={() => setisAddNewUser(false)}
                                footer={[
                                    <Button key="back" onClick={() => setisAddNewUser(false)}>
                                        Cancel
                                    </Button>,
                                    <Button key="ok" onClick={() => { form.submit() }}>
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <Form form={form} onFinish={onFinish}>
                                    <Form.Item name="user" label="Usuario">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="pass" label="Contraseña">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item name="roll" label="Roll">
                                        <Select
                                            options={[
                                                {
                                                    value: 'admin',
                                                    label: 'Administrador',
                                                },
                                                {
                                                    value: 'auxiliar',
                                                    label: 'Auxiliar',
                                                },
                                                {
                                                    value: 'revisor',
                                                    label: 'Revisor',
                                                }
                                            ]} />

                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    )
}

