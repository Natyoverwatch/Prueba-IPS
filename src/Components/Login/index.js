import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import logo from '../../Images/logo.png'
import './Style.scss'
import { FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Login() {
    const Datos = (value) => {
        console.log(value)
    };
    const navigate = useNavigate();
    return(
        <div className='container'>
            <div style={{width:'100%'}}>
                <Row style={{display:'flex', justifyContent:'center', padding: '0 1em'}}>
                    <Col className='loginform' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:6, offset:10 }} style={{margin:'0 2em'}}>
                        <div style={{display:'flex' ,justifyContent:'center',margin:'1em 0'}}>
                            <img src={logo} width="50%"/>
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
                                    <Input  prefix={<FiUser />} placeholder="Escribe tu usuario"/>
                                </Form.Item>
                                <Form.Item
                                    name='password'
                                    rules={[{ required: true, message: 'Por favor diligencie su contraseña!' }]}
                                    size='large'
                                    label='Contraseña:'
                                >
                                    <Input.Password prefix={<FiLock />} placeholder="Escribe tu contraseña"/>
                                </Form.Item>
                                <Form.Item >
                                    <Button 
                                        type='primary'
                                        htmlType="submit"
                                        className='estilobotoningresar'
                                        style={{margin:'1em 0'}}
                                        onClick={()=> navigate('/home')}
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
                    {/*
                        <Col xs={24} sm={24} md={20} lg={20} xl={8} style={{margin:'0 2em'}}>
                        <div style={{background:'blue', height:'200px', width:'100%'}}>
                        </div>
                    </Col>
    */}
                </Row>
            </div>
        </div>
    )
}

export default Login;