import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Input, Row, Col } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { SearchOutlined } from "@ant-design/icons"
import "../GestionDeUsuario/style.scss"
import { NavbarAdmin } from '../NavbarAdmin';

export default function GestUser() {
    const [isEditing, setisEditing] = useState(false)
    const [isAddNewUser, setisAddNewUser] = useState(false)
    const [isUserEditing, setisUserEditing] = useState('')

    //New User
    const [newUser, setnewUser] = useState({
        key: 0,
        user: '',
        pass: '',
        roll: ''
    });

    //Key counter
    const [isKey, setisKey] = useState(0)

    //Data people
    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            user: 'neto123',
            pass: 1234,
            roll: 'admin',
        },
        {
            key: 2,
            user: 'Jim Green',
            pass: 42,
            roll: 'auxiliar',
        },
        {
            key: 3,
            user: 'Joe Black',
            pass: 32,
            roll: 'usuario',
        },
    ])

    //Colums name from table
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


    //Add new User 
    const onAddUser = () => {
        setisKey(dataSource.length + 1)
    }

    //Delete specific user
    const deleteUser = (key) => {
        console.log(key)
        const newData = dataSource.filter((userData) => userData.key !== key);
        setDataSource(newData);
    }

    //Update info from user
    const editUser = (key) => {
        console.log(key)
        setisEditing(true)
        setisUserEditing({ ...key })
    }

    useEffect(() => {
        setisKey(dataSource.length)
    }, [0]);

    useEffect(() => {
        setnewUser({ ...newUser, key: isKey + 1 })
        if (newUser.key > dataSource.length) {
            setDataSource([...dataSource, newUser]);
            setnewUser({
                ...newUser,
                key: 0,
                user: '',
                pass: '',
                roll: ''
            })
        }
    }, [isKey]);

    return (
        <div>
            <NavbarAdmin />
            <div className='containeruser'>
                <div style={{ width: '100%' }}>
                    <Row style={{ display: 'flex', justifyContent: 'center', padding: '0em 2em' }}>
                        <Col className='tableUser' lg={24}>
                            <Button style={{ marginBottom: '2rem' }} onClick={() => { setisAddNewUser(true) }}>Agregar un nuevo usuario</Button>
                            <Table columns={columns} dataSource={dataSource} />
                            {/* Modal para modificaicón de usuarios */}
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
                                }}
                            >
                                <label>Nombre:</label>
                                <Input value={isUserEditing?.nameuser}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, nameuser: e.target.value } }) }}
                                ></Input>
                                <label>Contraseña:</label>
                                <Input value={isUserEditing?.password}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, password: e.target.value } }) }}
                                ></Input>
                                <label>Usuario:</label>
                                <Input value={isUserEditing?.user}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, user: e.target.value } }) }}
                                ></Input>
                                <label>Roll:</label>
                                <Input value={isUserEditing?.roll}
                                    onChange={(e) => { setisUserEditing(pre => { return { ...pre, roll: e.target.value } }) }}
                                ></Input>
                            </Modal>
                            {/* Modal para la creación de usuarios */}
                            <Modal
                                title="Nuevo Usuario"
                                open={isAddNewUser}
                                cancelText='Cancelar'
                                onCancel={() => { setisAddNewUser(false); }}
                                okText='Crear'
                                onOk={() => {
                                    if (newUser.user.length == 0 || newUser.pass.length == 0 || newUser.roll.length == 0) {
                                        alert('Revisa si te falta llenar algún dato');
                                    } else {
                                        setInputValue({
                                            ...inputValue,
                                            usuario: "",
                                            contra: "",
                                            roll: "",
                                        })
                                        setisAddNewUser(false);
                                        onAddUser();
                                    }
                                }}
                            >
                                <label>Usuario:</label>
                                <Input value={newUser.user}
                                    onChange={(e) => {
                                        setnewUser({ ...newUser, user: e.target.value })
                                    }} placeholder='Usuario' defaultValue="" >
                                </Input>
                                <label>Contraseña:</label>
                                <Input.Password value={newUser.pass}
                                    onChange={(e) => {
                                        setnewUser({ ...newUser, pass: e.target.value })
                                    }} placeholder='Contraseña' defaultValue=""></Input.Password>
                                <label>Roll:</label>
                                <Input value={newUser.roll}
                                    onChange={(e) => {
                                        setnewUser({ ...newUser, roll: e.target.value })
                                    }} placeholder='Roll' defaultValue=""></Input>
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    )
}

