import React from 'react'
import logo from '../../Images/logo.png'
import "./style.scss"

import { Form, Input, Button, Row, Col } from 'antd';
import { FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const Datos = (value) => {
        console.log(value)
    };

    const navigate = useNavigate();

    return (
        <div className='container'>
            <div style={{ width: '100%' }}>
                <Row style={{ display: 'flex', justifyContent: 'center', padding: '0 1em' }}>
                    <Col className='loginform' xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 10 }} style={{ margin: '0 2em' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
                            <img src={logo} alt='logo' />
                        </div>
                        <div>
                            <Form
                                onFinish={Datos}
                                name="basic"
                                layout="vertical"
                                autoComplete="off"
                            >
                                <Form.Item
                                    name='user'
                                    rules={[{ required: true, message: 'Por favor diligencie su usuario!' }]}
                                    size='large'
                                    label='Usuario:'

                                >
                                    <Input prefix={<FiUser />} placeholder="Escribe tu usuario" />
                                </Form.Item>
                                <Form.Item
                                    name='password'
                                    rules={[{ required: true, message: 'Por favor diligencie su contraseña!' }]}
                                    size='large'
                                    label='Contraseña:'
                                >
                                    <Input.Password prefix={<FiLock />} placeholder="Escribe tu contraseña" />
                                </Form.Item>
                                <Form.Item >
                                    <Button
                                        type='primary'
                                        htmlType="submit"
                                        className='estilobotoningresar'
                                        style={{ margin: '1em 0' }}
                                    // onClick={() => navigate('/home')}
                                    >
                                        Ingresar
                                    </Button>
                                    <Button
                                        type='default'
                                        className='estilobotoncancelar'
                                    >
                                        Cancelar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
