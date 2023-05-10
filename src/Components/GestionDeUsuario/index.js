import React, { useState, useContext, useEffect } from 'react'
import { Table, Button, Modal, Input, Row, Col, Form, Select } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { SearchOutlined } from "@ant-design/icons"
import "../GestionDeUsuario/style.scss"
import { NavbarAdmin } from '../NavbarAdmin';
import { addData } from "../../controller/control"
import { AppContext } from '../../Provider';

export default function GestUser() {
    //Forms to control diferent modals
    const [formNewuser] = Form.useForm();
    const [formUpdateuser] = Form.useForm();

    //Control form and update user
    const [isEditing, setisEditing] = useState(false)
    const [isUserEditing, setisUserEditing] = useState([])

    //Control for creating new user
    const [isAddNewUser, setisAddNewUser] = useState(false)

    //Global state
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
                        <FiTrash2 onClick={() => deleteUser(record.key)} />
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
    const editUser = (user) => {
        setisUserEditing({ ...user })
    }
    useEffect(() => {
        if (isUserEditing.length !== 0) setisEditing(true)
    }, [isUserEditing])

    //Send data server for new user
    const createNewUser = async (values) => {
        setisAddNewUser(false);
        const data = await addData(values, "https://2e45-147-75-123-138.ngrok-free.app/api/admin", state?.token)
        setState({ user: data[0], token: data[1].token })
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
                            {/* Modal para la creación de usuarios */}
                            <Modal
                                title="Creación de usuario"
                                open={isAddNewUser}
                                onCancel={() => setisAddNewUser(false)}
                                footer={[
                                    <Button key="cancel" onClick={() => setisAddNewUser(false)}>
                                        Cancelar
                                    </Button>,
                                    <Button key="create" onClick={() => { formNewuser.submit() }}>
                                        Crear
                                    </Button>,
                                ]}>
                                <Form form={formNewuser} onFinish={createNewUser}>
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
                                                    value: 'Administrador',
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
                            {/* Modal for updating users */}
                            <Modal
                                title="Actualización de usuario"
                                open={isEditing}
                                onCancel={() => setisEditing(false)}
                                footer={[
                                    <Button key="cancel" onClick={() => setisEditing(false)}>
                                        Cancelar
                                    </Button>,
                                    <Button key="update" onClick={() => {
                                        setDataSource((pre) => {
                                            return pre.map((user) => { return user.key === isUserEditing.key ? isUserEditing : user })
                                        });
                                        setisEditing(false);
                                    }}>
                                        Actualizar
                                    </Button>,
                                ]}>
                                <Form form={formUpdateuser}
                                    initialValues={{
                                        user: isUserEditing?.user,
                                        pass: isUserEditing?.pass,
                                        roll: isUserEditing?.roll,
                                    }}>
                                    <Form.Item name="user" label="Usuario">
                                        <Input
                                            onChange={(e) => { setisUserEditing(pre => { return { ...pre, user: e.target.value } }) }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="pass" label="Contraseña">
                                        <Input.Password name="pass"
                                            onChange={(e) => { setisUserEditing(pre => { return { ...pre, pass: e.target.value } }) }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="roll" label="Roll">
                                        <Select
                                            onChange={(value, e) => { setisUserEditing(pre => { return { ...pre, roll: value } }) }}
                                            options={[
                                                {
                                                    value: 'Administrador',
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

