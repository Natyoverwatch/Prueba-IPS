import React, { useState } from 'react'
import "../GestionDeUsuario/style.scss"
import { Table, Button, Modal, Input } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { NavbarAdmin } from './../NavbarAdmin';

export default function GestUser() {
    const [isEditing, setisEditing] = useState(false)
    const [isUserEditing, setisUserEditing] = useState('')
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nameuser',
            key: 'name',
            editable: true,
        },
        {
            title: 'Contraseña',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Usuario',
            dataIndex: 'user',
            key: 'user',
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

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            nameuser: 'neto123',
            password: 1234,
            user: 'New York No. 1 Lake Park',
            roll: 'admin',
            actions: ['edit', 'delete']
        },
        {
            key: '2',
            nameuser: 'Jim Green',
            password: 42,
            user: 'London No. 1 Lake Park',
            roll: 'auxiliar',
            actions: ['edit', 'delete']
        },
        {
            key: '3',
            nameuser: 'Joe Black',
            password: 32,
            user: 'Sydney No. 1 Lake Park',
            roll: 'usuario',
            actions: ['edit', 'delete']
        },
    ])

    const onAddUser = () => {
        const newData = {
            key: '4',
            nameuser: 'Joe Black Lol',
            password: 32,
            user: 'Sydney No. 1 Lake Park',
            roll: 'usuario',
            actions: ['edit', 'delete']
        };
        setDataSource([...dataSource, newData]);
    }

    const deleteUser = (key) => {
        console.log(key)
        const newData = dataSource.filter((userData) => userData.key !== key);
        setDataSource(newData);
        return (
            <>
            </>
        )
    }

    const editUser = (key) => {
        console.log(key)
        setisEditing(true)
        setisUserEditing({ ...key })
    }

    return (
        <div>
        <NavbarAdmin/>
        <div className='containeruser'>
            <div style={{ width: '100%' }}>
                <Button style={{ marginBottom: '2rem' }} onClick={onAddUser}>Agregar un nuevo usuario</Button>
                <Table columns={columns} dataSource={dataSource} />
                <Modal
                    title="Modificación"
                    open={isEditing}
                    cancelText='Cancelar'
                    onCancel={() => { setisEditing(false); }}
                    okText='Guardar'
                    onOk={() => {
                        setDataSource((pre) => {
                            return pre.map((user) => {
                                if (user.key === isUserEditing.key) {
                                    return isUserEditing
                                } else {
                                    return user
                                }
                            })
                        });
                    }}
                >
                    <label>Nombre:</label>
                    <Input value={isUserEditing?.nameuser}
                        onChange={(e) => {
                            setisUserEditing(pre => {
                                return { ...pre, nameuser: e.target.value }
                            }
                            )
                        }}
                        
                    ></Input>
                    <label>Contraseña:</label>
                    <Input value={isUserEditing?.password}
                        onChange={(e) => {
                            setisUserEditing(pre => {
                                return { ...pre, password: e.target.value }
                            }
                            )
                        }}

                    ></Input>
                    <label>Usuario:</label>
                    <Input value={isUserEditing?.user}
                        onChange={(e) => {
                            setisUserEditing(pre => {
                                return { ...pre, user: e.target.value }
                            }
                            )
                        }}
                    ></Input>
                    <label>Roll:</label>
                    <Input value={isUserEditing?.roll}
                        onChange={(e) => {
                            setisUserEditing(pre => {
                                return { ...pre, roll: e.target.value }
                            }
                            )
                        }}></Input>
                </Modal>
            </div >
        </div >
        </div>
    )
}
