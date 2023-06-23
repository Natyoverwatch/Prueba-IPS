import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { NavbarAdmin } from '../NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Table, Select } from 'antd';
import { addData, getData, editData, deleteData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const { Option } = Select

export default function AdminAuxiliar() {

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

    //Obtención de los supervisores
    const getUsers = async () => {
        const getConstdata = await getData("https://api.clubdeviajeros.tk/api/users", state?.token)
        console.log(getConstdata)
        const filteredData = getConstdata.filter(item => item.roll.toLowerCase() === "auxiliar")
        setDataSource([...dataSource, ...filteredData])
    }

    useEffect(() => {
        getUsers()
        console.log(dataSource)
        // eslint-disable-next-line
    }, [])

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
                            <Button type='primary' onClick={() => idAuxiliar.length > 0 ? navigate(`/asignacionsupervisor/${idAuxiliar}`) : ""}> Siguiente</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </div >
    )
}
